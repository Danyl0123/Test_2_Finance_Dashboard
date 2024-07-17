import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserContentService {
  apiUrl = `https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json`;
  http = inject(HttpClient);
  getData() {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
}
