import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel:Model<TaskDocument>,
    ){}
    
    create(createTaskDto:createTaskDto):Promise<Task>{
        const createdTask = new this.taskModel(createTaskDto)
        return createdTask.save()
    }
    findAll():Promise<Task[]>{
        return this.taskModel.find().exec()
    }
    findOne(id:string):Promise<Task | null>{
        return this.taskModel.findById(id).exec() 
    }
    async update(id:string):Promise<Task | null>{
        return this.taskModel.findByIdAndUpdate(id,{
            completed:true,
            new : true,
        }).exec()
    }
    async remove(id:string):Promise<Task | null>{
        return this.taskModel.findByIdAndDelete(id).exec()
    }
}
