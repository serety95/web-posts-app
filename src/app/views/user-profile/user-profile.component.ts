import { PostModel } from './../../models/post-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService:UserService
  ) {}
  user: UserModel;
  userPosts: PostModel[] = [];
  ngOnInit(): void {
    //this.user.posts=new Array<PostModel>()
    this.route.params.subscribe((params: any) => {
      if (params.userId) {
        this.getUser(params.userId);
      }
    });
  }
  getUser(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (user: UserModel) => {
        this.user = user;
        this.getUserPosts(user.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getUserPosts(userId: number) {
    this.userPosts = [];
    const myuser = this.user;
    this.postService
      .getPostsByUserId(userId)
      .subscribe((posts: PostModel[]) => {
        if (posts.length > 0) {
          this.userPosts = Object.values(posts);
          this.userPosts.forEach((post) => {
            post.user = myuser;
          });

          console.log(this.userPosts);
        }
      });
  }
}
