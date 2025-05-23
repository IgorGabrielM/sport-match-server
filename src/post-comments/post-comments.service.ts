import { Injectable } from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostComment } from './entities/post-comment.entity';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(PostComment)
    private postCommentRepository: Repository<PostComment>,
    private readonly userRepository: UsersService,
    private readonly usersService: UsersService,
    private readonly postService: PostsService,
  ) {}

  async create(createPostCommentDto: CreatePostCommentDto) {
    try {
      if (createPostCommentDto.userId && createPostCommentDto.postId) {
        let user = await this.userRepository.findOneById(
          createPostCommentDto.userId,
        );
        let post = await this.postService.findOne(createPostCommentDto.postId);

        return await this.postCommentRepository
          .save({ ...createPostCommentDto, user, post })
          .then(async () => {
            await this.usersService.addPoints(createPostCommentDto.userId, 5);
          });
      }
      // return this.postCommentRepository.save(createPostCommentDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.postCommentRepository.find({
        relations: ['user', 'post'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.postCommentRepository.findOne({
        where: { idPostComment: id },
        relations: ['user', 'post'],
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePostCommentDto: UpdatePostCommentDto) {
    try {
      return await this.postCommentRepository.update(id, updatePostCommentDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.postCommentRepository.delete({ idPostComment: id });
    } catch (error) {
      throw error;
    }
  }
}
