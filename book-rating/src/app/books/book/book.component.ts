import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  @Input()
  book: Book;

  @Output()
  rateDown = new EventEmitter<Book>();

  @Output()
  rateUp = new EventEmitter<Book>();

  get stars(): undefined[] {
    return new Array(this.book.rating);
  }

  doRateDown(): void {
    this.rateDown.emit(this.book);
  }

  doRateUp(): void {
    this.rateUp.emit(this.book);
  }

  log() {
    console.log('Change Detection!', +new Date());
  }
}
