import { Component, inject } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { AsyncPipe } from '@angular/common';
import { NoTasksComponent } from '../no-tasks/no-tasks.component';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe, NoTasksComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private taskService = inject(TaskService);

  public tasks$ = this.taskService.getTasks();

  public tasks = this.taskService.tasks;

  public numberOfTasks = this.taskService.numberOfTasks;
}
