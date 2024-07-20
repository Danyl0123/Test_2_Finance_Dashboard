import { Component, inject } from '@angular/core';
import { UserContentService } from '../../data/services/user-content.service';
import { User } from '../../data/interfaces/user.interface';
import { ShortTableComponent } from '../../components/short-table/short-table.component';

@Component({
  selector: 'app-short-information',
  standalone: true,
  imports: [ShortTableComponent],
  templateUrl: './short-information.component.html',
  styleUrl: './short-information.component.css',
})
export class ShortInformationComponent {
  userContentService = inject(UserContentService);
  users: User[] = [];

  constructor() {
    this.userContentService
      .getData()
      .subscribe((value) => (this.users = value));
  }
}
