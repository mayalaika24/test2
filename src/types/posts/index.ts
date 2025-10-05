import { FormValues } from '../../schema/posts';

export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}

export interface PostsResponse {
  posts: Array<Post>;
}

export interface PostPayload extends FormValues {
  userId: number;
}
