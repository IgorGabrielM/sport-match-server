import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../users/entities/user.entity';
import { InterestsService } from '../interests/interests.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly interestsService: InterestsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createEventDto: CreateEventDto, user: User): Promise<Event> {
    const { interests: interestDtos, ...eventData } = createEventDto;
    const newEvent = this.eventRepository.create({
      ...eventData,
      participants: [user],
    });

    if (interestDtos && interestDtos.length > 0) {
      const interests = await this.interestsService.findMultipleByIds(
        interestDtos.map(dto => dto.idInterest)
      );
      if (interests.length !== interestDtos.length) {
        throw new NotFoundException('One or more interests not found.');
      }
      newEvent.interests = interests;
    }

    return this.eventRepository.save(newEvent);
  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['participants', 'interests'] });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['participants', 'interests'],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const { interests: interestDtos, ...eventData } = updateEventDto;
    const event = await this.findOne(id);

    this.eventRepository.merge(event, eventData);

    if (interestDtos) {
      if (interestDtos.length > 0) {
        const interests = await this.interestsService.findMultipleByIds(
          interestDtos.map(dto => dto.idInterest)
        );
        if (interests.length !== interestDtos.length && interestDtos.length > 0) {
          throw new NotFoundException('One or more interests not found during update.');
        }
        event.interests = interests;
      } else {
        event.interests = [];
      }
    }

    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }

  async addParticipant(eventId: number, userId: number): Promise<Event> {
    const event = await this.findOne(eventId);
    const user = await this.userRepository.findOneBy({ idUser: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const isParticipant = event.participants.some(p => p.idUser === userId);
    if (!isParticipant) {
      event.participants.push(user);
      return this.eventRepository.save(event);
    }
    return event; 
  }

  async removeParticipant(eventId: number, userId: number): Promise<Event> {
    const event = await this.findOne(eventId);
    const initialParticipantCount = event.participants.length;
    event.participants = event.participants.filter(p => p.idUser !== userId);
    if (event.participants.length === initialParticipantCount) {
        throw new NotFoundException(`Participant with ID ${userId} not found in event ${eventId}`);
    }
    return this.eventRepository.save(event);
  }
}
