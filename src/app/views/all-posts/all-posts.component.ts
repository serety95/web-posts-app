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
  currentPage: number;
  selectedUser: UserModel;
  usersList: UserModel[] = [];
  selectedUsersIds: number[] = [];
  ngOnInit(): void {
    if ((this.userService.usersList.value.length < 1)) {
      this.loadUsersData();
    }else{
      this.usersList=[...this.userService.usersList.value]
    }

    console.log(this.usersList);
    this.postService.getPostsListFromStorage();
    this.postService.postsList.subscribe((postsData) => {
      console.log(postsData);
      if (postsData?.length == 0) {
        this.postService.getAllPosts().subscribe(
          (res) => {
            this.postsList = Object.values(res);
            this.postService.setPostsListToStorage(Object.values(res));
          },
          (err) => {
            console.log(err.message);
          }
        );
      } else {
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
    this.loadData();
  }
  onScrollDown() {
    this.pageNumber++;
    this.currentPage = this.pageNumber;
  }
  loadData() {
    //const startItem = (this.pageNumber - 1) * 10;
    const startItem = 0;
    const endItem = this.pageNumber * 10;

    if (this.selectedUsersIds.length > 0) {
      this.returnedArray = this.postsList.filter((x: PostModel) =>
        this.selectedUsersIds.includes(x.userId)
      );
    } else {
      this.returnedArray = [
        ...new Set([
          ...this.returnedArray,
          ...this.postsList.slice(startItem, endItem),
        ]),
      ];
    }

    this.returnedArray.sort((a, b) => a.id - b.id);
    this.returnedArray.forEach((x) => {
      if (!x.user) {
        this.getUser(x);
      }
      if (!x.comments) {
        this.getComments(x.id);
      }
    });
    if (this.currentPage != this.pageNumber) {
      setTimeout(() => {
        this.focusOn();
      }, 200);
      this.currentPage = this.pageNumber;
    }
  }
  focusOn() {
    let focusedToElement = document.getElementById(
      `post${this.pageNumber > 1 ? (this.pageNumber - 1) * 10 + 1 : 1}`
    );

    if (focusedToElement) {
      focusedToElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
  getHovered(id) {
    this.currentPage = Math.ceil(id / 10);
    this.pageNumber = this.currentPage;

    // console.log(id, this.currentPage, this.pageNumber);
  }
  selectedUsersChange(e: UserModel[]) {
    this.selectedUsersIds = [];
    e.forEach((user) => {
      this.selectedUsersIds.push(user.id);
    });
    console.log(this.selectedUsersIds);
  }
  sumbitFilter() {
    this.loadData();
    console.log(this.returnedArray);
  }
  loadUsersData() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.usersList = [...Object.values(res)];
        this.userService.usersList.next(Object.values(res));
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
