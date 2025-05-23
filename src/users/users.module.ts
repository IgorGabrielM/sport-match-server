import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Interest } from '../interests/entities/interest.entity'; // No longer needed here
import { Post } from '../posts/entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { InterestsModule } from '../interests/interests.module'; // Import InterestsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]), // Removed Interest
    InterestsModule, // Added InterestsModule
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Use environment variable for secret
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' }, // Use environment variable
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
