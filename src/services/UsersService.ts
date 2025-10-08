import { toast } from 'sonner';
import CrudRepository from '../api/CrudRepository';
import { User } from '../types/users';

export default class UsersService extends CrudRepository {
  constructor() {
    super('users');
  }
  async getData(): Promise<Array<User>> {
    return await this.get();
  }
  async getUserById(id: string): Promise<User> {
    return await this.get(`${this.endpoint}/${id}`);
  }
  async addUser(user: User) {
    return await this.post(this.endpoint, user);
  }
  async updateUser(id: string, user: User) {
    return await this.put(`${this.endpoint}/${id}`, user);
  }
  async deleteUser(id: string) {
    return await this.delete(`${this.endpoint}/${id}`);
  }
}

export const usersService = new UsersService();
