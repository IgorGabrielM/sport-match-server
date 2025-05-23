import { Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

class InterestDto {
  @IsInt()
  idInterest: number;
}

export class CreateEventDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  dateTime: Date;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterestDto)
  interests?: InterestDto[];

  // participants will likely be handled differently, e.g. by adding the current user or specific users by ID
  // For now, we'll assume participants are added/managed via separate endpoints or logic
}
