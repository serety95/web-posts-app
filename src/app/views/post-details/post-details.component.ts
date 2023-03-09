import { UserModel } from './../../models/user-model';
import { PostModel } from './../../models/post-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentModel } from 'src/app/models/comment-model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post: PostModel;
  postNotFound: boolean = false;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.postService.getPostsListFromStorage();
    if (this.postService.postsList.value.length > 0) {
      this.checkPostData();
      this.checkUserData();
      this.getComments();
    } else {
      this.postService.getPost(this.route.snapshot.params['postId']).subscribe(
        (res: PostModel) => {
          this.post = res;
          this.getUserData();
          this.getComments();
        },
        (err) => {
          console.log(err);
          this.postNotFound = true;
        }
      );
    }


  }
  addComment(e) {
    let newComment: CommentModel = {
      name: 'test new comment',
      body: e.target.value,
      postId: this.post.id,
      id: this.post.comments.length + 1,
      email: this.post.user.email,
    };

    this.post.comments.push(newComment);
  }
  getComments() {
    this.postService.getPostComments(this.post.id).subscribe((res) => {
      this.post.comments = Object.values(res);
    });
  }
  getUserData() {
    this.userService
      .getUserById(
        this.post?.userId
          ? this.post?.userId
          : this.route.snapshot.params['postId']
      )
      .subscribe((res) => {
        this.post.user = res;
      });
  }
  checkPostData() {
    let retrivedPostFromStorage = this.postService.postsList.value.find(
      (post: PostModel) => post.id == +this.route.snapshot.params['postId']
    );
   
    if (retrivedPostFromStorage != undefined) {
      this.post = retrivedPostFromStorage;
    } else {
      this.postNotFound = true;
    }
  }
  checkUserData() {
    let postedUser = this.userService.usersList.value.find(
      (user: UserModel) => user.id == this.post.userId
    );
    if (postedUser != undefined) {
      this.post.user = postedUser;
    } else {
      this.getUserData();
    }
  }
  getAvatarLink(userId): string {
    if (userId > 8) {
      return `https://bootdey.com/img/Content/avatar/avatar8.png`;
    } else {
      return `https://bootdey.com/img/Content/avatar/avatar${userId}.png`;
    }
  }
}
