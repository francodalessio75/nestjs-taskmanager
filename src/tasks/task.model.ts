export interface Task{
   id:string;
   title:string;
   description:string;
   status: TaskStatus
}

enum TaskStatus{
    open = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}
