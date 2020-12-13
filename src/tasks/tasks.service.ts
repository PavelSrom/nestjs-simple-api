import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  createTask(task: Omit<Task, 'id' | 'completed'>): Task {
    const newTask: Task = {
      ...task,
      id: nanoid(),
      completed: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  deleteById(id: string): Task {
    const taskToDelete = this.findById(id);
    this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);

    return taskToDelete;
  }
}
