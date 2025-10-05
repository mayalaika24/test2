import CrudRepository from '../api/CrudRepository';
import { AuthResponse } from '../types/auth';
import { FormValues } from '../schema/login';

export default class AuthService extends CrudRepository {
  constructor() {
    super('/auth');
  }

  async login(credentials: FormValues): Promise<AuthResponse> {
    return await this.post(`${this.endpoint}/login`, credentials);
  }

  async logout(): Promise<any> {
    return await this.post(`${this.endpoint}/logout`);
  }
}

export const authService = new AuthService();
