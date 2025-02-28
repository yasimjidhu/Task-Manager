import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService:ConfigService) => ({
        uri:configService.get<string>('MONGO_URI')
      }),
      inject:[ConfigService]
    }),
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],  
})
export class AppModule {}
