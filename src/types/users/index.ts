import { Book } from '../books';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  borrowedBooks: Array<Pick<Book, 'id' | 'title'>>;
}
