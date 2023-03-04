import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { PostModel } from '../models/post-model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsList: BehaviorSubject<Array<PostModel>> = new BehaviorSubject<
    Array<PostModel>
  >([]);
  constructor(private http: HttpClient) {}
  getAllPosts() {
    return this.http.get('http://jsonplaceholder.typicode.com/posts');
  }
  getPostsByUserId(userId: number): any {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
  }
  getUserById(userId: number): any {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
  }
  getPostComments(postId) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
  }
  setPostsList(postArray) {
    this.postsList.next(postArray);
    sessionStorage.setItem('postsList', JSON.stringify(this.postsList.value));
  }
  getPostsList(){
    let retrievedData = JSON.parse(sessionStorage.getItem('postsList'));
    console.log("retrevied",retrievedData)
    this.postsList.next(retrievedData);
  }
}
