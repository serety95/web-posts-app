import { CommentModel } from './../../models/comment-model';
import { PostModel } from './../../models/post-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: PostModel;
  constructor() {}

  ngOnInit(): void {}
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
  getAvatarLink(userId):string{
    return `https://bootdey.com/img/Content/avatar/avatar${userId}.png`;
  }
}
