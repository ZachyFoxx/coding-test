import { Requests } from './../database/entity/Requests';
import { appDataSource } from './../database/data-source';
import { Injectable, NestMiddleware } from '@nestjs/common';
const reqs = appDataSource.getRepository(Requests);

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
