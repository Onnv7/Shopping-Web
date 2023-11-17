import { HttpException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export const validateObjectId = (mongooseId: string) => {
  const result = isValidObjectId(mongooseId);

  if (!result) {
    throw new HttpException('Invalid id', 400);
  }
};
