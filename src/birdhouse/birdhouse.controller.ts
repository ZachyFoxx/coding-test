import { Birdhouse } from './../database/entity/Birdhouse';
import { Get, Param, Patch, Post } from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';
export class BirdhouseController {
  constructor(private readonly birdhouseService: BirdhouseService) {}

  @Get('house/:birdhouse')
  async getBirdhouse(@Param('id') id: string): Promise<Birdhouse> {
    return await this.birdhouseService.findOne({ where: { uuid: id } });
  }

  @Post('house')
  async createHouse(
    longitude: number,
    lattitude: number,
    name: string,
  ): Promise<Birdhouse> {
    return await this.birdhouseService.createHouse(longitude, lattitude, name);
  }

  @Patch('house/:id')
  async updateLocation(
    @Param('id') id: string,
    longitude: number,
    lattitude: number,
  ): Promise<Birdhouse> {
    return await this.birdhouseService.updateLocation(id, longitude, lattitude);
  }

  @Post('house/:id/residency')
  async updateResidency(
    @Param('id') id: string,
    birds: number,
    eggs: number,
  ): Promise<Birdhouse> {
    return await this.birdhouseService.updateResidency(id, birds, eggs);
  }
}
