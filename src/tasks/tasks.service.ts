import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository){}

    // getAllTasks():Task[]{
    //     return this.tasks;
    // }

    // getTasksWithFilter(filterDto:GetTasksFilterDto):Task[]{
    //     const {status, search} = filterDto;

    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = this.tasks.filter( task => task.status === status )
    //     }

    //     if(search){
    //         tasks = tasks.filter( task  => {
    //             return (task.title.includes(search) || task.description.includes(search))
    //         });
    //     }
    //     return tasks;
    // }

    async getTaskById(id:string):Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found;
    }

    createTask(createTaskDto:CreateTaskDto):Promise<Task>{
       return this.taskRepository.createTask(createTaskDto);
    }

    // deleteTask( id:string):void{
    //     this.tasks = this.tasks.filter(task => task.id !== id)
    // }

    // updateTaskStatus( id:string, taskStatus:TaskStatus):Task{
    //     const task = this.getTaskById(id);
    //     task.status = taskStatus;
    //     return task
    // }
}
