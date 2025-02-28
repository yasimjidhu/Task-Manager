import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jidhuyasim:e0scJW3WUB6PlmeF@yasimcluster.h0s2l.mongodb.net/taskManagement?retryWrites=true&w=majority&appName=yasimcluster'),
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],  
})
export class AppModule {}
