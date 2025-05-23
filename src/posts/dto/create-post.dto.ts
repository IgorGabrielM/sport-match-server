import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { CreateInterestDto } from '../../interests/dto/create-interest.dto';

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsString()
    readonly text: string;

    @ApiProperty()
    @IsString()
    readonly imageUrl: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    readonly likesCount: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    readonly commentsCount: number;

    @ApiProperty()
    @IsNumber()
    readonly idUser: number;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsNumber({}, { each: true })
    readonly interestIds: number[];
}
