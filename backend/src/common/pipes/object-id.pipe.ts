import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`ID ${value} is not valid`);
    }
    return value;
  }
}
