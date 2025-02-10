import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryService } from '../../services/category.service';
import { categoryBackgroundColors } from '../../constants/categories-colors';

const MODULES = [MatDividerModule];

@Component({
    selector: 'app-colors-list',
    imports: [...MODULES],
    templateUrl: './colors-list.component.html',
    styleUrl: './colors-list.component.scss'
})
export class ColorsListComponent {
  private readonly categoryService = inject(CategoryService);
  public categories = this.categoryService.categories;
  public categoryBackgroundColors = categoryBackgroundColors;
}
