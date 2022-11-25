import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApisModule } from './apis/apis.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
