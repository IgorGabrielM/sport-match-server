import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateInterestDto {
    @ApiProperty()
    @IsString()
    readonly text: string;

    @ApiProperty({ type: [Number] })
    @IsArray()
    readonly mediaIds: number[];

    @ApiProperty({ type: [Number] })
    @IsArray()
    readonly userIds: number[];

    @ApiProperty({ type: [Number] })
    @IsArray()
    readonly postIds: number[];
}
