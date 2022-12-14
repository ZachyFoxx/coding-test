import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

// Simple, yet useful middleware.
// This ensures the UUID being passed to the database is actually a UUID. This will prevent many, *many* errors.
@Injectable()
export class idValidateMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const id = req.params.id;
    if (!uuidValidate(id))
      throw new HttpException('Invalid Birdhouse ID!', HttpStatus.BAD_REQUEST);

    next();
  }
}
