export interface LoginRequest {
  phone_number: string;
  password: string;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'female' | 'male';
  image: string;
}
