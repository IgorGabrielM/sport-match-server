import { Module, forwardRef } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsController } from './post-comments.controller';
import { PostComment } from './entities/post-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([PostComment, User, Post]),
    forwardRef(() => UsersModule),
    forwardRef(() => PostsModule)
  ],
  controllers: [PostCommentsController],
  providers: [PostCommentsService],
  exports: [PostCommentsService]
})
export class PostCommentsModule {}
