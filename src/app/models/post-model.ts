import { UserModel } from './user-model';
import { CommentModel } from './comment-model';

export interface PostModel {
  body: string;
  id: number;
  title: string;
  userId: number;
  comments?: CommentModel[] | null;
  user?:UserModel
}
