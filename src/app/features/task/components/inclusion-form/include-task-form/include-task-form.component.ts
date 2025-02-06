import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { CategoryService } from '../../../../categories/services/category.service';
import { createTaskForm } from '../../../constants/create-task-form';
import { Task } from '../../../model/task.model';
import { TaskService } from '../../../service/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const MODULES = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-include-task-form',
  standalone: true,
  imports: [...MODULES],
  templateUrl: './include-task-form.component.html',
  styleUrl: './include-task-form.component.scss',
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly taskService = inject(TaskService);
  public categories = this.categoryService.categories;

  public destroy$ = inject(DestroyRef);
  public newTaskForm = createTaskForm();

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public onEnterToAddATask(): void {
    if (this.newTaskForm.invalid) return;

    const { title, categoryId } = this.newTaskForm.value;

    const newTask: Partial<Task> = {
      title,
      categoryId,
      isCompleted: false,
    };

    this.taskService
      .createTask(newTask)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: task => this.taskService.insertATaskInTheTaskList(task),
        error: error => {
          throw new Error(error.message);
        },
        complete: () => {
          alert('Tarefa incluida ');
        },
      });
  }
}
