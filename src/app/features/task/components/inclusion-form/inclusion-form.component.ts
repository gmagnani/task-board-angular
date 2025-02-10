import { Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../categories/services/category.service';
import { categoryIdBackgroundColors } from '../../../categories/constants/categories-colors';
import { NgClass } from '@angular/common';
import { TaskService } from '../../service/task.service';

const COMPONENTS = [IncludeTaskFormComponent];

const COMMONS = [NgClass];
@Component({
    selector: 'app-inclusion-form',
    imports: [...COMPONENTS, ...COMMONS],
    templateUrl: './inclusion-form.component.html',
    styleUrl: './inclusion-form.component.scss'
})
export class InclusionFormComponent {
  private readonly categoryService = inject(CategoryService);
  public readonly taskService = inject(TaskService);
  public readonly selectedCategoryId = this.categoryService.selectedCategoryId;
  public colorVariants = categoryIdBackgroundColors;
}
