import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    getTasksWithFilter(filterDto:GetTasksFilterDto):Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = this.tasks.filter( task => task.status === status )
        }

        if(search){
            tasks = tasks.filter( task  => {
                return (task.title.includes(search) || task.description.includes(search))
            });
        }
        return tasks;
    }

    getTaskById(id:string):Task{
        return this.tasks.find( task => task.id === id)
    }

    createTask(createTaskDto:CreateTaskDto):Task{
        const {title,description} = createTaskDto;
        const task:Task = {
            id:uuidv4(),
            title:title,
            description:description,
            status: TaskStatus.open
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask( id:string):void{
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskStatus( id:string, taskStatus:TaskStatus):Task{
        const task = this.getTaskById(id);
        task.status = taskStatus;
        return task
    }
}
