import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InterestsService } from '../interests/interests.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private interestsService: InterestsService,
    private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { interests: interestIds, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const userEntity = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      if (interestIds && interestIds.length > 0) {
        const fetchedInterests = await this.interestsService.findMultipleByIds(interestIds);
        if (fetchedInterests.length !== interestIds.length) {
          throw new NotFoundException('One or more interests not found during user creation.');
        }
        userEntity.interests = fetchedInterests;
      }

      return await this.userRepository.save(userEntity);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find({
        relations: { interests: true, posts: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email: email },
        relations: ['interests', 'posts'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number) {
    try {
      const rawUser = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.idUser', 'idUser')
        .addSelect('user.name', 'name')
        .addSelect('user.email', 'email')
        .addSelect('user.imageUrl', 'imageUrl')
        .addSelect('user.bio', 'bio')
        .addSelect('user.birthdate', 'birthdate')
        .addSelect('user.points', 'points')
        .addSelect('RANK() OVER (ORDER BY user.points DESC)', 'userRank')
        .leftJoinAndSelect('user.interests', 'interests')
        .leftJoinAndSelect('user.posts', 'posts')
        .leftJoinAndSelect('posts.likes', 'likes')
        .leftJoinAndSelect('posts.comments', 'comments')
        .leftJoinAndSelect('posts.interests', 'post_interests')
        .loadRelationCountAndMap('user.postsCount', 'user.posts')
        .loadRelationCountAndMap('posts.commentsCount', 'posts.comments')
        .where('user.idUser = :id', { id })
        .getRawOne();

      const userWithRank = await this.userRepository.findOne({
        where: { idUser: id },
        relations: [
          'interests',
          'posts',
          'posts.likes',
          'posts.comments',
          'posts.interests',
        ],
      });

      if (userWithRank && rawUser) {
        return {
          ...userWithRank,
          userRank: rawUser.userRank,
        };
      } else if (userWithRank) {
        return userWithRank;
      }
      throw new NotFoundException(`User with ID ${id} not found.`);
    } catch (error) {
      throw error;
    }
  }

  async findAllByRank() {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .addSelect('RANK() OVER (ORDER BY user.points DESC)', 'userRank')
        .leftJoinAndSelect('user.interests', 'interests')
        .leftJoinAndSelect('user.posts', 'posts')
        .leftJoinAndSelect('posts.likes', 'likes')
        .leftJoinAndSelect('posts.comments', 'comments')
        .leftJoinAndSelect('posts.interests', 'post_interests')
        .loadRelationCountAndMap('user.postsCount', 'user.posts')
        .loadRelationCountAndMap('posts.commentsCount', 'posts.comments')
        .orderBy('user.points', 'DESC')
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async auth(email, password) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (user && await bcrypt.compare(password, user.password)) {
        return this.generateToken(user);
      }
      throw new NotFoundException('Invalid credentials.');
    } catch (error) {
      throw error;
    }
  }

  async addPoints(id: number, points: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { idUser: id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user.points += points;
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { idUser: userId },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found for update.');
      }

      const { interests: interestIds, password, ...userData } = updateUserDto;

      Object.assign(existingUser, userData);

      if (password) {
        existingUser.password = await bcrypt.hash(password, 10);
      }

      if (interestIds) {
        if (interestIds.length > 0) {
          const fetchedInterests = await this.interestsService.findMultipleByIds(interestIds);
          if (fetchedInterests.length !== interestIds.length) {
            throw new NotFoundException('One or more interests not found during user update.');
          }
          existingUser.interests = fetchedInterests;
        } else {
          existingUser.interests = [];
        }
      }

      return await this.userRepository.save(existingUser);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found for deletion.`);
      }
    } catch (error) {
      throw error;
    }
  }



  generateToken(user: User) {
    const payload = { email: user.email, sub: user.idUser, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
