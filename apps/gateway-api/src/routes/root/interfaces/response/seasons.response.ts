import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SeasonsResponse {
  @ApiProperty({
    default: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    default: 'success',
  })
  message: string;
  @ApiProperty({
    default: {
      data: [],
    },
  })
  data?: { [key: string]: unknown };
}
