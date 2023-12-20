import { ISpeaker } from './speaker.interface';

export interface IURLResults {
  url: string;
  error: {
    status: boolean;
    detail?: string;
  };
  data?: ISpeaker[];
}
