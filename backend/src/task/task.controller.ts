import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService:TaskService){}

    @Post()
    create(@Body() createTaskDto:createTaskDto):Promise<Task>{
        return this.taskService.create(createTaskDto)
    }
    @Get()
    findAll():Promise<Task[]>{
        return this.taskService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id:string):Promise<Task | null>{
        return this.taskService.findOne(id)
    }
    @Put(':id')
    update(@Param('id') id:string):Promise<Task | null>{
        return this.taskService.update(id)
    }
    @Delete(':id')
    remove(@Param('id') id:string):Promise<Task | null>{
        return this.taskService.remove(id)
    }
}
