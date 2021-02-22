import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // Achtung: Bug sobald wir AJAX machen
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(
    private br: BookRatingService,
    private bs: BookStoreService) {
  }

  ngOnInit(): void {
    this.bs.getBooks().subscribe(books => this.books = books);
  }

  rateUp(book: Book): void {
    const ratedBook = this.br.rateUp(book);

    // const ratedBook = {
    //   ...book,
    //   rating: book.rating < 5 ? book.rating + 1 : book.rating
    // };

    this.updateBook(ratedBook);
  }

  rateDown(book: Book): void {
    const ratedBook = this.br.rateDown(book);
    this.updateBook(ratedBook);
  }

  updateBook(ratedBook: Book): void  {
    this.books = this.books
      .map(x => x.isbn === ratedBook.isbn ? ratedBook : x)
      .sort((a, b) => b.rating - a.rating);
  }

  addBook(newBook: Book): void {
    this.books = [...this.books, newBook];
  }
}
