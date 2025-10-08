import CrudRepository from '../api/CrudRepository';
import { Book } from '../types/books';
import { User } from '../types/users';
import { usersService } from './UsersService';

export default class BooksService extends CrudRepository {
  constructor() {
    super('books');
  }
  async getData(): Promise<Array<Book>> {
    return await this.get();
  }
  async addBook(book: Book) {
    return await this.post(this.endpoint, book);
  }
  async updateBook(id: string, book: Book) {
    return await this.put(`${this.endpoint}/${id}`, book);
  }
  async deleteBook(id: string) {
    return await this.delete(`${this.endpoint}/${id}`);
  }
  async borrowBook(bookId: string, user: User) {
    const books = await this.getData();
    const book = books.find((el) => el.id === bookId);
    if (book && !book.isBorrowed) {
      this.updateBook(bookId, {
        ...book,
        isBorrowed: true,
        borrowedBy: { id: user.id, name: user.name },
      });
      usersService.updateUser(user.id, {
        ...user,
        borrowedBooks: [
          ...user.borrowedBooks,
          { id: book.id, title: book.title },
        ],
      });
    }
  }
  async returnBook(bookId: string, user: User) {
    const books = await this.getData();
    const book = books.find((book) => book.id === bookId);
    if (book) {
      this.updateBook(bookId, {
        ...book,
        borrowedBy: undefined,
        isBorrowed: false,
      });
      usersService.updateUser(user.id, {
        ...user,
        borrowedBooks: user.borrowedBooks.filter((el) => el.id !== bookId),
      });
    }
  }
}

export const booksService = new BooksService();
