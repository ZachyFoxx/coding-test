import { BirdhouseService } from './birdhouse.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly birdhouseService: BirdhouseService) {}

  use(req: any, res: any, next: (error?: any) => void) {
    // Get our auth header
    const authHeader = req.get('X-UBID');
    if (!authHeader)
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);

    // Ensure it is a valid UUID
    if (!uuidValidate(authHeader))
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);

    // Now make sure that UUID, or UBID, is in our system
    const birdhouse = this.birdhouseService.findOne({
      where: { ubid: authHeader },
    });

    // YOU SHALL NOT PASS! (This UBID does not exist in our system)
    if (!birdhouse)
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);

    next();
  }
}
