import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { User } from '../../data/interfaces/user.interface';
import { Observable } from 'rxjs';
import { UserContentService } from '../../data/services/user-content.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltersPanelComponent } from '../filters-panel/filters-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FiltersPanelComponent,
    NgxPaginationModule,
    FormsModule,
  ],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() users: User[] = [];
  filteredUsers$!: Observable<User[]>;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  noUsers: boolean = false;
  loading: boolean = false;

  @ViewChild('noUsers') noUsersTemplate!: TemplateRef<any>;

  constructor(public userContentService: UserContentService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    setTimeout(() => {
      this.filteredUsers$ = this.userContentService.getDataWithFilters();
      this.loading = false;
    }, 1000);
  }

  onFilterChange(filters: {
    issuanceStartFrom: string;
    issuanceStartTo: string;
    issuanceEndFrom: string;
    issuanceEndTo: string;
    showOverdueOnly: boolean;
  }) {
    this.userContentService.updateFilters(filters);
    this.currentPage = 1;
    this.loadData();
  }
  hasUsers(users: User[] | null): boolean {
    return users !== null && users.length > 0;
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
