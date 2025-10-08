export interface Borrower {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  rating: number;
  pages: number;
  publisher: string;
  isBorrowed: boolean;
  borrowedBy?: Borrower;
}
