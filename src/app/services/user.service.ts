import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  usersList: BehaviorSubject<Array<UserModel>> = new BehaviorSubject<
    Array<UserModel>
  >([]);
  getUsers() {
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }
  getUserById(userId: number): any {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
  }
  getUsersData() {
    this.getUsers().subscribe(
      (res) => {
        this.usersList.next(Object.values(res))
       
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
