import { CreateBirdhouseDto } from './dto/CreateBirdhouseDto';
import { Birdhouse } from './../database/entity/Birdhouse';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';

@Controller()
export class BirdhouseController {
  constructor(private readonly birdhouseService: BirdhouseService) {}

  @Get('house/:id')
  async getBirdhouse(@Param('id') id: string): Promise<Birdhouse> {
    const birdhouse = await this.birdhouseService.findOne({
      where: { uuid: id },
    });

    delete birdhouse.ubid;
    delete birdhouse.uuid;
    delete birdhouse.last_update;

    return birdhouse;
  }

  @Post('house')
  async createHouse(
    @Body() createHouseDto: CreateBirdhouseDto,
  ): Promise<Birdhouse> {
    if (createHouseDto.name.length < 4 || createHouseDto.name.length > 16)
      throw new HttpException(
        'Please enter a name greater than 4 or less than 16 characters!',
        HttpStatus.BAD_REQUEST,
      );

    return await this.birdhouseService.createHouse(
      createHouseDto.latitude,
      createHouseDto.longitude,
      createHouseDto.name,
    );
  }

  @Patch('house/:id')
  async updateLocation(
    @Param('id') id: string,
    @Body() body,
  ): Promise<Birdhouse> {
    const birdhouse = await this.birdhouseService.updateLocation(
      id,
      body.longitude,
      body.latitude,
    );

    delete birdhouse.ubid;
    delete birdhouse.uuid;
    delete birdhouse.last_update;

    return birdhouse;
  }

  @Post('house/:id/residency')
  async updateResidency(
    @Param('id') id: string,
    @Body() body,
  ): Promise<Birdhouse> {
    const { eggs, birds } = body;
    if (eggs < 0 || birds < 0)
      throw new HttpException(
        'Birds and Eggs cannot be negative',
        HttpStatus.BAD_REQUEST,
      );

    const birdhouse = await this.birdhouseService.updateResidency(
      id,
      body.birds,
      body.eggs,
    );

    delete birdhouse.ubid;
    delete birdhouse.uuid;
    delete birdhouse.last_update;

    return birdhouse;
  }
}
