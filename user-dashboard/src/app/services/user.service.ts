import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../User/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api'; // Updated API base URL

  constructor(private http: HttpClient) {}

  // Fetch users with pagination and caching
  getUsers(page: number): Observable<User[]> {
    const cachedUsers = localStorage.getItem(`users-page-${page}`);
    if (cachedUsers) {
      return of(JSON.parse(cachedUsers));
    }
    return this.http.get<{ data: User[] }>(`${this.apiUrl}/users?page=${page}`).pipe(
      map(response => {
        localStorage.setItem(`users-page-${page}`, JSON.stringify(response.data));
        return response.data;
      })
    );
  }

  // Fetch a single user by ID with caching
  getUser(id: number): Observable<User> {
    const cachedUser = localStorage.getItem(`user-${id}`);
    if (cachedUser) {
      return of(JSON.parse(cachedUser));
    }
    return this.http.get<{ data: User }>(`${this.apiUrl}/users/${id}`).pipe(
      map(response => {
        localStorage.setItem(`user-${id}`, JSON.stringify(response.data));
        return response.data;
      })
    );
  }
}
