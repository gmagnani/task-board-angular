import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-tasks',
  imports: [],
  templateUrl: './no-tasks.component.html',
  styleUrl: './no-tasks.component.scss',
})
export class NoTasksComponent {
  @Input() public alt!: string;

  @Input() public imageUrl!: string;

  @Input() public message!: string;
}
