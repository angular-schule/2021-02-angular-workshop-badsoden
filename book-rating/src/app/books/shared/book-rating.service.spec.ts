import { Book } from './book';
import { BookRatingService } from './book-rating.service';

describe('BookRatingService with rating like on Amazon', () => {

  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    service = new BookRatingService();
    book = {
      isbn: '000',
      title: 'Test',
      description: 'Blubb',
      rating: 3
    }
  });

  it('should rate up a book by one', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(4);
  });

  it('should rate down a book by one', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not be allowed to have a rating greater than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not be allowed to have a rating smaller than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });

  it('should always return a new book instance (assuming immutability)', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook).not.toBe(book);

    const ratedBook2 = service.rateDown(book);
    expect(ratedBook2).not.toBe(book);
  });
});
