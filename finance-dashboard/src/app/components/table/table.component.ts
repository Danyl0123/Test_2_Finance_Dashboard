import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../data/interfaces/user.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() users: User[] = [];

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
