import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[];

  constructor() { }

  ngOnInit(): void {
    this.books = [{
      isbn: '000',
      title: 'Angular',
      description: 'Tolles Buch',
      rating: 5
    }, {
      isbn: '111',
      title: 'React',
      description: 'Doofes Buch',
      rating: 3
    }, {
      isbn: '222',
      title: 'AngularJS',
      description: 'Altes Buch',
      rating: 1
    }];
  }

  rateUp(book: Book) {
    console.info('rateUp', book);
    // console.table(book);
  }

  rateDown(book: Book) {
    console.info('rateDown', book);
  }
}
