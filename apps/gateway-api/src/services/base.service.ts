import { Logger } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';

export class BaseService {
  private readonly logger = new Logger('ServiceConnectivity');
  protected client: ClientTCP;
  port: number;
  name: string;

  constructor(port: number) {
    this.client = new ClientTCP({
      port: port,
    });
    this.client.connect();
  }
}
