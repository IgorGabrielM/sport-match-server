import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class LikePostDto {
    @ApiProperty()
    @IsNumber()
    idPost: number;

    @ApiProperty()
    @IsNumber()
    idUser: number;
}