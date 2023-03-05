import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http:HttpClient) {}
  getUserById(userId: number): any {

  }
  getUsers() {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users`
    );
  }
}
