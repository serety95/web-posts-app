import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PostModel } from './../../models/post-model';
import { UserModel } from './../../models/user-model';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  constructor(private postService: PostService) {}
  postsList: PostModel[] = [];
  returnedArray: PostModel[] = [];
  ngOnInit(): void {
    this.postService.postsList.subscribe((x) => {
      console.log(x);
      if (x.length == 0) {
        this.postService.getAllPosts().subscribe(
          (res) => {
            this.postsList = Object.values(res);
            this.postService.setPostsList(Object.values(res));
            this.pageChanged({ page: 1, itemsPerPage: 10 });
          },
          (err) => {
            console.log(err.message);
          }
        );
      } else {
        this.postService.getAllPosts();
        this.postsList = this.postService.postsList.value;
        this.pageChanged({ page: 1, itemsPerPage: 10 });
      }
    });
  }

  getComments(postId) {
    let x: PostModel = this.postsList.find((x) => x.id == postId);
    this.postService.getPostComments(postId).subscribe((res) => {
      x.comments = Object.values(res);
    });
  }
  getUser(post) {
    this.postService.getUserById(post.userId).subscribe((user: UserModel) => {
      post.user = user;
    });
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.postsList.slice(startItem, endItem);
    this.returnedArray.forEach((x) => {
      this.getUser(x);
      this.getComments(x.id);
    });
    
    //  const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    //  input.focus();
    //  input.select();
  }
}
