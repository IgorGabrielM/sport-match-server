import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from '../post-comments/entities/post-comment.entity';
import { Interest } from '../interests/entities/interest.entity';
import { User } from '../users/entities/user.entity';
import { PostCommentsModule } from 'src/post-comments/post-comments.module';
import { InterestsModule } from 'src/interests/interests.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Interest, PostComment]), PostCommentsModule, InterestsModule, UsersModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule { }
