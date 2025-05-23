import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '../auth/auth.guard'; // Assuming you have an AuthGuard
import { User } from '../users/entities/user.entity'; // To type the request user

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard) // Protect the route
  @Post()
  create(@Body() createEventDto: CreateEventDto, @Req() req) { // req will have the user property after AuthGuard
    // Assuming AuthGuard attaches the authenticated user to req.user
    const user = req.user as User;
    return this.eventsService.create(createEventDto, user);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(AuthGuard) // Optionally protect update
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @UseGuards(AuthGuard) // Optionally protect delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }

  // --- Participant Management Endpoints (Example) ---
  // You would need to ensure your AuthGuard and service methods are correctly implemented

  @UseGuards(AuthGuard)
  @Post(':eventId/participants/:userId')
  async addParticipant(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
    // @Req() req, // You might want to check if req.user is authorized to add participants
  ) {
    // const requestingUser = req.user as User;
    // Add authorization logic here if needed, e.g., only event creator or admin can add participants
    return this.eventsService.addParticipant(eventId, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':eventId/participants/:userId')
  async removeParticipant(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
    // @Req() req, // Similar authorization considerations as above
  ) {
    // const requestingUser = req.user as User;
    return this.eventsService.removeParticipant(eventId, userId);
  }
}
