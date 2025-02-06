import { Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../categories/services/category.service';
import { categoryIdBackgroundColors } from '../../../categories/constants/categories-colors';

const COMPONENTS = [IncludeTaskFormComponent];

@Component({
  selector: 'app-inclusion-form',
  standalone: true,
  imports: [...COMPONENTS],
  templateUrl: './inclusion-form.component.html',
  styleUrl: './inclusion-form.component.scss',
})
export class InclusionFormComponent {
  private readonly categoryService = inject(CategoryService);
  public readonly selectedCategoryId = this.categoryService.selectedCategoryId;
  public colorVariants = categoryIdBackgroundColors;
}
