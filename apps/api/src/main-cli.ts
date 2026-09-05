import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';

@Module({
  imports: [AppModule.register([])],
})
class CliModule {}

async function bootstrap() {
  await CommandFactory.run(CliModule, {
    logger: ['warn', 'error'],
  });
}
bootstrap();
