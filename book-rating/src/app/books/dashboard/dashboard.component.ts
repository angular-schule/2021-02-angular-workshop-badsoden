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
      isbn: '3864906466',
      title: 'Angular',
      description: 'Tolles Buch',
      rating: 5
    },
    {
      isbn: '1449344852',
      title: 'AngularJS',
      description: 'Nich so tolles Buch',
      rating: 2
    },
    {
      isbn: '9781492037651',
      title: 'TypeScript',
      description: 'Prima Buch',
      rating: 1
    },
    {
      isbn: '0072130261',
      title: 'HTML',
      description: 'Buch',
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
