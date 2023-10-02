import { Module } from '@nestjs/common';
import { EnvironmentConfig } from './enviroment.config';

@Module({
  imports: [EnvironmentConfig],
})
export class AppConfig {}
