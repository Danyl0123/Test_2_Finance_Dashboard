import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../data/interfaces/user.interface';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserContentService } from '../../data/services/user-content.service';
import { FiltersPanelComponent } from '../filters-panel/filters-panel.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FiltersPanelComponent,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() users: User[] = [];
  filteredUsers$: Observable<User[]> = of([]);
  currentPage: number = 1;
  itemsPerPage: number = 10;

  private issuanceDateStart$ = new BehaviorSubject<string>('');
  private issuanceDateEnd$ = new BehaviorSubject<string>('');
  private showOverdueOnly$ = new BehaviorSubject<boolean>(false);

  constructor(private userContentService: UserContentService) {}

  ngOnInit() {
    this.filteredUsers$ = combineLatest([
      this.userContentService.getData(),
      this.issuanceDateStart$,
      this.issuanceDateEnd$,
      this.showOverdueOnly$,
    ]).pipe(
      map(([users, issuanceStart, issuanceEnd, overdueOnly]) => {
        if (!users) return [];
        return users.filter((user) => {
          const issuanceDate = new Date(user.issuance_date);
          const returnDate = new Date(user.return_date);
          const actualReturnDate = user.actual_return_date
            ? new Date(user.actual_return_date)
            : null;
          const today = new Date();

          const matchesIssuanceDate =
            !issuanceStart ||
            issuanceDate.getTime() === new Date(issuanceStart).getTime();

          const matchesReturnDate =
            !issuanceEnd ||
            returnDate.getTime() === new Date(issuanceEnd).getTime();

          const isOverdue = overdueOnly
            ? (actualReturnDate &&
                actualReturnDate.getTime() > returnDate.getTime()) ||
              (!actualReturnDate && returnDate.getTime() < today.getTime())
            : true;

          return matchesIssuanceDate && matchesReturnDate && isOverdue;
        });
      })
    );
  }

  onFilterChange(filters: {
    issuanceStart: string;
    issuanceEnd: string;
    showOverdueOnly: boolean;
  }) {
    this.issuanceDateStart$.next(filters.issuanceStart);
    this.issuanceDateEnd$.next(filters.issuanceEnd);
    this.showOverdueOnly$.next(filters.showOverdueOnly);
    this.currentPage = 1;
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
