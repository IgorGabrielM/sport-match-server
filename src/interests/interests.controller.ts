import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) { }

  @Post()
  create(@Body() createInterestDto: CreateInterestDto) {
    try {
      return this.interestsService.create(createInterestDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.interestsService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.interestsService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterestDto: UpdateInterestDto) {
    try {
      return this.interestsService.update(+id, updateInterestDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.interestsService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
