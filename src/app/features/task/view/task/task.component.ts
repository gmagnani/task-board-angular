import { Component } from '@angular/core';
import { InclusionFormComponent } from '../../components/inclusion-form/inclusion-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

const COMPONENTS = [InclusionFormComponent];

@Component({
  selector: 'app-task',
  imports: [...COMPONENTS, TaskListComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {}
