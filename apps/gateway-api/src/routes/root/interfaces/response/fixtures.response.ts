import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class FixturesResponse {
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
