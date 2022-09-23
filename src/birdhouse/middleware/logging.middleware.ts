import { Injectable, NestMiddleware } from '@nestjs/common';
import { birdhouseDS } from '../database';
import { Requests } from '../database/entity/Requests';
const reqs = birdhouseDS.getRepository(Requests);

// Log anything and everything.
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    reqs
      .createQueryBuilder()
      .insert()
      .into(Requests)
      .values({
        method: req.method,
        url: req.url,
        params: req.params,
        body: req.body,
        query: req.query,
      })
      .execute();
    next();
  }
}
