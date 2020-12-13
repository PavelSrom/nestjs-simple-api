import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  findAll(): Task[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Task {
    return this.taskService.findById(id);
  }

  @Post()
  createTask(@Body() body: Omit<Task, 'id' | 'completed'>): Task {
    return this.taskService.createTask(body);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Task {
    return this.taskService.deleteById(id);
  }
}
