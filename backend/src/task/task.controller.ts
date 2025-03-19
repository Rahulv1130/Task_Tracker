import { Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    getTasks(@Req() req: any) {
        return this.taskService.getTask(req.user.id)
    }

    @Post()
    addTask(@Req() req: any) {
        return this.taskService.addTask(req.user.id , req.body)
    }

    @Patch(":id")
    deleteTask(@Param("id") taskId: string) {
        return this.taskService.completeTask(taskId)
    }


    @Delete()
    deleteCompletedTasks(@Req() req: any) {
        return this.taskService.deleteCompletedTasks(req.user.id)
    }
}
