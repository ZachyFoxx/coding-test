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
        // The magic number here is one year time in unix epoch.
        where: { last_update: LessThan(new Date().getTime() - 31556926000) },
      })
    ).forEach((house) => {
      // Prune any houses that haven't received updates in over a year
      this.birdhouseService.delete(house.ubid);
    });
    next();
  }
}
