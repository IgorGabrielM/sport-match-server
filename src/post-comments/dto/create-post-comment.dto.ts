import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreatePostCommentDto {
    @ApiProperty()
    @IsString()
    text: string;

    @ApiProperty()
    @IsNumber()
    postId: number;

    @ApiProperty()
    @IsNumber()
    userId: number;
}
