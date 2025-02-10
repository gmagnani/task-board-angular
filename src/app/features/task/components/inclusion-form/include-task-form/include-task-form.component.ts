import { Component, computed, DestroyRef, inject } from '@angular/core';
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
import { finalize } from 'rxjs';
import { NgClass } from '@angular/common';
import { SnackBarService } from '../../../../../shared/services/snack-bar.service';

const MODULES = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
];

const COMMONS = [NgClass];

@Component({
  selector: 'app-include-task-form',
  standalone: true,
  imports: [...MODULES, ...COMMONS],
  templateUrl: './include-task-form.component.html',
  styleUrl: './include-task-form.component.scss',
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly taskService = inject(TaskService);
  public readonly categories = this.categoryService.categories;
  private readonly snackBarService = inject(SnackBarService);

  private readonly destroy$ = inject(DestroyRef);
  public newTaskForm = createTaskForm();

  public isIncludeTaskFormDisable = computed(() => {
    if (this.taskService.isLoadingTask()) {
      this.newTaskForm.disable();

      return this.taskService.isLoadingTask();
    }

    this.newTaskForm.enable();
    return this.taskService.isLoadingTask();
  });

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public onEnterToAddATask(): void {
    if (this.newTaskForm.invalid) return;

    this.taskService.isLoadingTask.set(true);

    const { title, categoryId } = this.newTaskForm.value;

    const newTask: Partial<Task> = {
      title,
      categoryId,
      isCompleted: false,
    };

    this.taskService
      .createTask(newTask)
      .pipe(
        finalize(() => this.taskService.isLoadingTask.set(false)),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe({
        next: task => this.taskService.insertATaskInTheTaskList(task),
        error: error => {
          this.snackBarService.showSnackBar(error.message, 4000, 'end', 'top');
        },
        complete: () => {
          this.snackBarService.showSnackBar(
            'Tarefa incluida!',
            4000,
            'end',
            'top'
          );
        },
      });
  }
}
