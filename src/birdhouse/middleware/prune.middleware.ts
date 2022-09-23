import { Injectable, NestMiddleware } from '@nestjs/common';
import { BirdhouseService } from '../birdhouse.service';
import { LessThan } from 'typeorm';

// Log anything and everything.
@Injectable()
export class PruneMiddleware implements NestMiddleware {
  constructor(private readonly birdhouseService: BirdhouseService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    await (
      await this.birdhouseService.findAll({
        where: { last_update: LessThan(new Date().getTime() - 31556926000) },
      })
    ).forEach((house) => {
      this.birdhouseService.delete(house.ubid);
    });
    next();
  }
}
