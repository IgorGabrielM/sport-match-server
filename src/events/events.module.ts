import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
// import { Interest } from '../interests/entities/interest.entity'; // No longer directly imported for repository
import { User } from '../users/entities/user.entity';
import { InterestsModule } from '../interests/interests.module'; // Import InterestsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User]), // Removed Interest from here
    InterestsModule, // Add InterestsModule to imports
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
