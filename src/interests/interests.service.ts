import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';

@Injectable()
export class InterestsService implements OnModuleInit {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) { }

  async onModuleInit() {
    const count = await this.interestRepository.count();

    // Se a tabela estiver vazia, insere os valores
    // const interests = [
    //   { text: 'Programação' },
    //   { text: 'Cybersegurança' },
    //   { text: 'Design' },
    //   { text: 'UI' },
    //   { text: 'UX' },
    //   { text: 'UI/UX' },
    //   { text: 'Geografia' },
    //   { text: 'Sistemas embarcados' },
    //   { text: 'Programação competitiva' },
    //   { text: 'Física' },
    //   { text: 'Biologia' },
    //   { text: 'Biomedicina' },
    //   { text: 'Idiomas' },
    //   { text: 'Inglês' },
    //   { text: 'Japônes' },
    //   { text: 'Alemão' },
    //   { text: 'Russo' },
    //   { text: 'Espanhol' },
    //   { text: 'Algoritmos' },
    //   { text: 'Medicina' },
    //   { text: 'IA' },
    //   { text: 'Deep Learning' },
    //   { text: 'Machine Learning' },
    //   { text: 'Redes neurais' },
    //   { text: 'Automação' },
    //   { text: 'Criptografia' },
    //   { text: 'OS' },
    //   { text: 'Python' },
    //   { text: 'Java' },
    //   { text: 'Go' },
    //   { text: 'Javascript' },
    //   { text: 'Node.js' },
    //   { text: 'React' },
    //   { text: 'Angular' },
    //   { text: 'Vue.js' },
    //   { text: 'Spring Boot' },
    //   { text: 'Front-end' },
    //   { text: 'Back-end' },
    //   { text: 'Cloud' },
    //   { text: 'DevOps' },
    //   { text: 'Full Stack' },
    //   { text: 'Redes' },
    //   { text: 'Tradução' },
    //   { text: 'Eletrônica' },
    //   { text: 'Eletroeletrônica' },
    //   { text: 'Figma' },
    // ];
    // if (count === 0) {
    //   await this.interestRepository.save(interests);
    // } else {
    //   await this.interestRepository.delete({});
    //   await this.interestRepository.query(`ALTER TABLE interest AUTO_INCREMENT = 1`);
    //   await this.interestRepository.save(interests);
    // }
  }

  async create(createInterestDto: CreateInterestDto) {
    try {
      return await this.interestRepository.insert(createInterestDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.interestRepository
        .createQueryBuilder('interest')
        .leftJoinAndSelect('interest.users', 'user_interest')
        .leftJoinAndSelect('interest.medias', 'medias')
        .leftJoinAndSelect('interest.posts', 'post')
        .leftJoinAndSelect('post.user', 'user')
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.interestRepository.findOne({
        where: { idInterest: id },
        relations: ['users', 'medias', 'posts'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findMultipleByIds(ids: number[]): Promise<Interest[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    return this.interestRepository.createQueryBuilder('interest')
      .where('interest.idInterest IN (:...ids)', { ids })
      .getMany();
  }

  async update(id: number, updateInterestDto: UpdateInterestDto) {
    try {
      return await this.interestRepository.update(id, updateInterestDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.interestRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async addInterstMedia(id: number, idMedia: number) {
    try {
      return await this.interestRepository
        .createQueryBuilder()
        .relation(Interest, 'medias')
        .of(id)
        .add(idMedia);
    } catch (error) {
      throw error;
    }
  }
}
