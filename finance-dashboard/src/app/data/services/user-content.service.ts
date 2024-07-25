import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserContentService {
  private apiUrl = `https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json`;

  private issuanceDateStartFrom$ = new BehaviorSubject<string>('');
  private issuanceDateStartTo$ = new BehaviorSubject<string>('');
  private issuanceDateEndFrom$ = new BehaviorSubject<string>('');
  private issuanceDateEndTo$ = new BehaviorSubject<string>('');
  private showOverdueOnly$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Метод для получения данных с примененными фильтрами
  getDataWithFilters(): Observable<User[]> {
    return combineLatest([
      this.getData(),
      this.issuanceDateStartFrom$,
      this.issuanceDateStartTo$,
      this.issuanceDateEndFrom$,
      this.issuanceDateEndTo$,
      this.showOverdueOnly$,
    ]).pipe(
      map(
        ([
          users,
          issuanceStartFrom,
          issuanceStartTo,
          issuanceEndFrom,
          issuanceEndTo,
          overdueOnly,
        ]) => {
          return this.filterUsers(users, {
            issuanceStartFrom,
            issuanceStartTo,
            issuanceEndFrom,
            issuanceEndTo,
            overdueOnly,
          });
        }
      )
    );
  }

  // Метод для загрузки данных с сервера
  getData(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Фильтрация данных на основе переданных фильтров
  private filterUsers(
    users: User[] | undefined,
    filters: {
      issuanceStartFrom: string;
      issuanceStartTo: string;
      issuanceEndFrom: string;
      issuanceEndTo: string;
      overdueOnly: boolean;
    }
  ): User[] {
    if (!users) return [];

    const today = new Date();

    return users.filter((user) => {
      const issuanceDate = new Date(user.issuance_date);
      const returnDate = new Date(user.return_date);
      const actualReturnDate = user.actual_return_date
        ? new Date(user.actual_return_date)
        : null;

      const matchesIssuanceDate =
        (!filters.issuanceStartFrom ||
          issuanceDate >= new Date(filters.issuanceStartFrom)) &&
        (!filters.issuanceStartTo ||
          issuanceDate <= new Date(filters.issuanceStartTo));

      const matchesReturnDate =
        (!filters.issuanceEndFrom ||
          (actualReturnDate &&
            actualReturnDate >= new Date(filters.issuanceEndFrom))) &&
        (!filters.issuanceEndTo ||
          (actualReturnDate &&
            actualReturnDate <= new Date(filters.issuanceEndTo)));

      const isOverdue = filters.overdueOnly
        ? (actualReturnDate && actualReturnDate > returnDate) ||
          (!actualReturnDate && returnDate < today)
        : true;

      return matchesIssuanceDate && matchesReturnDate && isOverdue;
    });
  }

  // Метод для обновления фильтров
  updateFilters(filters: {
    issuanceStartFrom: string;
    issuanceStartTo: string;
    issuanceEndFrom: string;
    issuanceEndTo: string;
    showOverdueOnly: boolean;
  }): void {
    this.issuanceDateStartFrom$.next(filters.issuanceStartFrom);
    this.issuanceDateStartTo$.next(filters.issuanceStartTo);
    this.issuanceDateEndFrom$.next(filters.issuanceEndFrom);
    this.issuanceDateEndTo$.next(filters.issuanceEndTo);
    this.showOverdueOnly$.next(filters.showOverdueOnly);
  }
}
