import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { CreateInterestDto } from 'src/interests/dto/create-interest.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  bio?: string;
  email?: string;
  gender?: string;
  birthdate?: Date;
  interests?: number[];
  imageUrl?: string;
  name?: string;
  password?: string;
}
