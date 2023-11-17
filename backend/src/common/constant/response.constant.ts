import { HttpStatus } from '@nestjs/common';

export const StatusCode = {
  OK: HttpStatus.OK,
  CREATED: HttpStatus.CREATED,
  CONFLICT: HttpStatus.CONFLICT,
  BAD_REQUEST: HttpStatus.BAD_REQUEST,
  NOT_FOUND: HttpStatus.NOT_FOUND,
};

export const SuccessMsg = {
  OK: 'Done successfully',
  UPDATED: 'Updated successfully',
  CREATED: 'Created successfully',
  GET: 'Get successfully',
};
