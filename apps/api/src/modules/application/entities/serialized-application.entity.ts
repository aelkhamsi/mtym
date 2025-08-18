import { Application } from './application.entity';

export class SerializedApplication extends Application {
  constructor(partial: Partial<SerializedApplication>) {
    super(partial);
  }
}
