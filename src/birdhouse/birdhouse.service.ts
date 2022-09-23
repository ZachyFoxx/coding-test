import { Birdhouse } from 'src/database';
import { FindOneOptions, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class BirdhouseService {
  constructor(private readonly birdhouseRepository: Repository<Birdhouse>) {}

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
      where: { ubid: houseId },
    });

    birdhouse.birds = birds;
    birdhouse.eggs = eggs;

    await this.birdhouseRepository.save(birdhouse);

    return birdhouse;
  }

  /**
   * Update the location of a birdhouse
   * @param houseId The ID of the house to update
   * @param longitude The new longitude
   * @param lattitude The new lattitude
   * @returns A promise containing the updated birdhouse
   */
  async updateLocation(
    houseId: string,
    longitude: number,
    lattitude: number,
  ): Promise<Birdhouse> {
    const birdhouse = await this.birdhouseRepository.findOne({
      where: { ubid: houseId },
    });

    birdhouse.longitude = longitude;
    birdhouse.lattitude = lattitude;

    await this.birdhouseRepository.save(birdhouse);

    return birdhouse;
  }

  /**
   * Create a new birdhouse
   * @param longitude Longitude of the house
   * @param lattitude Lattitude of the house
   * @param name The name of the hose
   * @returns A promise containing the bitdhouse
   */
  async createHouse(
    longitude: number,
    lattitude: number,
    name: string,
  ): Promise<Birdhouse> {
    const birdhouse = this.birdhouseRepository.create({
      ubid: uuidv4(),
      name: name,
      longitude: longitude,
      lattitude: lattitude,
      birds: 0,
      eggs: 0,
    });

    await this.birdhouseRepository.save(birdhouse);

    return birdhouse;
  }
}
