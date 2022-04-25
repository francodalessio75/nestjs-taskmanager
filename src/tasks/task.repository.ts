import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
        const {title,description} = createTaskDto;
        const task = this.create({
            title:title, 
            description:description, 
            status:TaskStatus.open
        })
        await this.save(task);
        return task;
    }

    async deleteTask(id:string):Promise<boolean>{
        this.delete( task => task.)
    }

}