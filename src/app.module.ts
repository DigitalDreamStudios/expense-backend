import { Module } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [AppConfig, EventsModule],
})
export class AppModule {}
