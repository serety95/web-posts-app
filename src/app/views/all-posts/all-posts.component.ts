import { UserService } from './../../services/user.service';
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
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}
  postsList: PostModel[] = [];
  returnedArray: PostModel[] = [];
  pageNumber: number = 1;
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
    this.userService.getUserById(post.userId).subscribe((user: UserModel) => {
      post.user = user;
    });
  }
  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = [
      ...new Set([
        ...this.returnedArray,
        ...this.postsList.slice(startItem, endItem),
      ]),
    ];
    this.returnedArray.sort((a, b) => a.id - b.id)
    this.returnedArray.forEach((x) => {
      if (!x.user) {
        this.getUser(x);
      }
      if (!x.comments) {
        this.getComments(x.id);
      }
    })

    setTimeout(() => {
       this.focusOn();
    }, 200);


    //  const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    //  input.focus();
    //  input.select();
  }
  onScrollDown() {
    this.pageNumber++;
    const startItem = (this.pageNumber - 1) * 10;
    const endItem = this.pageNumber * 10;
    this.returnedArray = [
      ...new Set([
        ...this.returnedArray,
        ...this.postsList.slice(startItem, endItem),
      ]),
    ];
    this.returnedArray.sort((a, b) => a.id - b.id);
    //this.returnedArray.push(...this.postsList.slice(startItem, endItem));
    this.returnedArray.forEach((x) => {
      if (!x.user) {
        this.getUser(x);
      }
      if (!x.comments) {
        this.getComments(x.id);
      }
    });
    //this.pageChanged({ itemsPerPage: 10, page: this.pageNumber });
  }
  focusOn() {
    let focusedToElement = document.getElementById(
      `post${(this.pageNumber - 1) * 10 + 1}`
    );
    console.log(`post${(this.pageNumber - 1) * 10 + 1}`, focusedToElement);
    if (focusedToElement) {
      focusedToElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
