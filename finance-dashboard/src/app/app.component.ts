import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserContentService } from './data/services/user-content.service';
import { CommonModule } from '@angular/common';
import { User } from './data/interfaces/user.interface';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule, TableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userContentService = inject(UserContentService);
  users: User[] = [];

  constructor() {
    this.userContentService.getData().subscribe((value) => {
      this.users = value;
    });
  }
}
