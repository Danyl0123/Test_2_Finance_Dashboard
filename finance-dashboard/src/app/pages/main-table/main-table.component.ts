import { Component, inject } from '@angular/core';
import { User } from '../../data/interfaces/user.interface';
import { UserContentService } from '../../data/services/user-content.service';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TableComponent } from '../../components/table/table.component';
import { FiltersPanelComponent } from '../../components/filters-panel/filters-panel.component';

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule,
    TableComponent,
    FiltersPanelComponent,
  ],
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.css',
})
export class MainTableComponent {
  userContentService = inject(UserContentService);
  users: User[] = [];
  private subscription: Subscription;

  constructor() {
    this.subscription = this.userContentService.getData().subscribe((value) => {
      this.users = value;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
