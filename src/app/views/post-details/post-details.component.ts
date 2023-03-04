import { PostModel } from './../../models/post-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentModel } from 'src/app/models/comment-model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post: PostModel;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.post = this.postService.postsList.value.find(
      (x) => x.id == +this.route.snapshot.params['postId']
    );
    console.log(this.post);
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
}
