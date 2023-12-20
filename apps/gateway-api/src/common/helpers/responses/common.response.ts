import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

// Common Response Interface for services
export class CommonResponse {
  @ApiProperty({
    default: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    default: 'success',
  })
  message?: string;

  @ApiProperty()
  data?: { [key: string]: unknown };
}
