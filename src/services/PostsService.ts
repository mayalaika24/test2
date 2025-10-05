import CrudRepository from '../api/CrudRepository';
import { ApiResponse } from '../types';
import { PostPayload, PostsResponse } from '../types/posts';
export default class PostsService extends CrudRepository {
  constructor() {
    super('/posts');
  }
  async getPosts(
    skip: number = 0,
    limit: number = 10
  ): Promise<ApiResponse & PostsResponse> {
    return this.get({ skip, limit });
  }
  async createPost(payload: PostPayload): Promise<PostsResponse> {
    return this.post(`${this.endpoint}/add`, payload);
  }
  async updatePost(payload: PostPayload, id: number): Promise<PostsResponse> {
    return this.put(`${this.endpoint}/${id}`, payload);
  }
  async deletePost(id: number): Promise<any> {
    return this.delete(`${this.endpoint}/${id}`);
  }
}

export const postsService = new PostsService();
