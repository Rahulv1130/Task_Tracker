import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}


    async getTask(id) {             // to get a task
        const tasks = await this.prisma.task.findMany({
            where: {
                userId: id
            }
        })

        return { tasks } ;
    }

    async addTask(id , body) {          // to add a new task
        
        const task = await this.prisma.task.create({
            data: {
                userId: id,
                title: body.title
            }
        })

        return task;
    }

    async completeTask(taskId: string) {            // to complete a panding task
        await this.prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                completed: true
            }
        })
        return { message: "Task Completed" }
    }

    async deleteCompletedTasks(userId: string) {            // to delete all the completed tasks
        await this.prisma.task.deleteMany({
            where: {
                userId: userId,
                completed: true
            }
        })

        return { message: "Deleted Completed Tasks" }
    }
}
