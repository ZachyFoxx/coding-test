import { CreateBirdhouseDto } from './dto/CreateBirdhouseDto';
import { Birdhouse } from './database/entity/Birdhouse';
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

  // Endpoint for obtaining information about a birdhouse
  @Get('house/:id')
  async getBirdhouse(@Param('id') id: string): Promise<Birdhouse> {
    const birdhouse = await this.birdhouseService.findOne({
      where: { uuid: id },
    });

    if (!birdhouse)
      throw new HttpException(
        'No birdhouse with that ID found!',
        HttpStatus.BAD_REQUEST,
      );

    // Remove information the public end-user doesn't need
    delete birdhouse.ubid;
    delete birdhouse.uuid;
    delete birdhouse.last_update;

    return birdhouse;
  }

  // Endpoint for creating a birdhouse
  @Post('house')
  async createHouse(
    @Body() createHouseDto: CreateBirdhouseDto,
  ): Promise<Birdhouse> {
    // The name needs to follow our formatting standards.
    if (createHouseDto.name.length < 4 || createHouseDto.name.length > 16)
      throw new HttpException(
        'Please enter a name greater than 4 or less than 16 characters!',
        HttpStatus.BAD_REQUEST,
      );

    // Create and return our birdhouse information, including the UBID so it can be used later
    return await this.birdhouseService.createHouse(
      createHouseDto.latitude,
      createHouseDto.longitude,
      createHouseDto.name,
    );
  }

  // Update a birdhouse's positioning
  @Patch('house/:id')
  async updateLocation(
    @Param('id') id: string,
    @Body() body,
  ): Promise<Birdhouse> {
    const { longitude, latitude } = body;

    // Ensure we are working with numbers and not strings
    if (!isValidNumber(longitude) || !isValidNumber(latitude))
      throw new HttpException(
        'Please enter a valid integer',
        HttpStatus.BAD_REQUEST,
      );

    if (!longitude || !latitude)
      throw new HttpException(
        'Please enter a longitude and latitude.',
        HttpStatus.BAD_REQUEST,
      );

    const birdhouse = await this.birdhouseService.updateLocation(
      id,
      body.longitude,
      body.latitude,
    );

    // Again - Remove unnecessary information
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

    // Ensure we are working with numbers and not strings
    if (!isValidNumber(eggs) || !isValidNumber(birds))
      throw new HttpException(
        'Please enter a valid integer',
        HttpStatus.BAD_REQUEST,
      );

    if (!eggs || !birds)
      throw new HttpException(
        'Please enter the amount of eggs and birds',
        HttpStatus.BAD_REQUEST,
      );

    // We can't have negative birds or eggs -- unless we implement a debt system... :disgust:
    if (eggs < 0 || birds < 0)
      throw new HttpException(
        'Birds and Eggs cannot be negative',
        HttpStatus.BAD_REQUEST,
      );

    // Update our house
    const birdhouse = await this.birdhouseService.updateResidency(
      id,
      body.birds,
      body.eggs,
    );

    // STAHP with the useless information
    delete birdhouse.ubid;
    delete birdhouse.uuid;
    delete birdhouse.last_update;

    return birdhouse;
  }
}

function isValidNumber(n: any) {
  return !isNaN(n) && n < 9007199254740991;
}
