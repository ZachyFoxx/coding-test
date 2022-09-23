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
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);

    if (!uuidValidate(authHeader))
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    const birdhouse = this.birdhouseService.findOne({
      where: { ubid: authHeader },
    });

    if (!birdhouse)
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);

    next();
  }
}
