import CrudRepository from '../api/CrudRepository';
import { Book } from '../types/books';

export default class BooksService extends CrudRepository {
  constructor() {
    super('books');
  }
  async getBooks() {
    return await this.get();
  }
  async addBook(book: Book) {
    return await this.post(this.endpoint, book);
  }
  async updateBook(id: string, book: Book) {
    return await this.put(`${this.endpoint}/${id}`, book);
  }
  async deleteBook(id: string) {
    return await this.delete(`${this.endpoint}/${id}`)
  }
}

export const booksService = new BooksService();
