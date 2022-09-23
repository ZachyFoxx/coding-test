import { appDataSource } from './../database/data-source';
import { Birdhouse } from 'src/database';
import { FindOneOptions, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Events } from 'src/database/entity/Events';

export class BirdhouseService {
  constructor(
    private readonly birdhouseRepository: Repository<Birdhouse> = appDataSource.getRepository(
      Birdhouse,
    ),
    private readonly eventRepository: Repository<Events> = appDataSource.getRepository(
      Events,
    ),
  ) {}

  /**
   * Get all birdhouses in the database
   * @returns A promise containing a list of birdhouses
   */
  async findAll(): Promise<Birdhouse[]> {
    return await this.birdhouseRepository.find();
  }

  /**
   * Find a single birdhouse
   * @param options TypeORM find options
   * @returns A promise containing a birdhouse if one is found
   */
  async findOne(options?: FindOneOptions<Birdhouse>): Promise<Birdhouse> {
    const birdhouse = await this.birdhouseRepository.findOne(options);
    delete birdhouse.ubid;
    delete birdhouse.uuid;
    return birdhouse;
  }

  /**
   * Update the residency of a birdhouse
   * @param houseId The ID of the house to update
   * @param birds New number of birds
   * @param eggs New number of eggs
   * @returns A promise containing the updated birdhouse
   */
  async updateResidency(
    houseId: string,
    birds: number,
    eggs: number,
  ): Promise<Birdhouse> {
    const birdhouse = await this.birdhouseRepository.findOne({
      where: { uuid: houseId },
    });

    const old_birds = birdhouse.birds;
    const old_eggs = birdhouse.eggs;

    birdhouse.birds = birds;
    birdhouse.eggs = eggs;

    await this.eventRepository.insert({
      birdhouse: birdhouse.uuid,
      egg_difference: eggs - old_eggs,
      birds_difference: birds - old_birds,
      longitude_difference: 0,
      latitude_difference: 0,
    });

    await this.birdhouseRepository.save(birdhouse);

    return birdhouse;
  }

  /**
   * Update the location of a birdhouse
   * @param houseId The ID of the house to update
   * @param longitude The new longitude
   * @param latitude The new latitude
   * @returns A promise containing the updated birdhouse
   */
  async updateLocation(
    houseId: string,
    longitude: number,
    latitude: number,
  ): Promise<Birdhouse> {
    const birdhouse = await this.birdhouseRepository.findOne({
      where: { uuid: houseId },
    });

    const old_longitude = birdhouse.longitude;
    const old_latitude = birdhouse.latitude;

    birdhouse.longitude = longitude;
    birdhouse.latitude = latitude;

    await this.birdhouseRepository.save(birdhouse);

    await this.eventRepository.insert({
      birdhouse: birdhouse.uuid,
      egg_difference: 0,
      birds_difference: 0,
      longitude_difference: longitude - old_longitude,
      latitude_difference: latitude - old_latitude,
    });

    return birdhouse;
  }

  /**
   * Create a new birdhouse
   * @param longitude Longitude of the house
   * @param latitude Latitude of the house
   * @param name The name of the hose
   * @returns A promise containing the bitdhouse
   */
  async createHouse(
    longitude: number,
    latitude: number,
    name: string,
  ): Promise<Birdhouse> {
    const birdhouse = this.birdhouseRepository.create({
      ubid: uuidv4(),
      name: name,
      longitude: longitude,
      latitude: latitude,
      birds: 0,
      eggs: 0,
    });

    await this.birdhouseRepository.save(birdhouse);

    return birdhouse;
  }
}
