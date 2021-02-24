import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { catchError, map, retry, switchMap } from 'rxjs/operators';

import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {

  showDetails = false;

  book$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('isbn')),
    switchMap(isbn => this.bs.getSingleBook(isbn).pipe(
      retry(3),
      // catchError((err: HttpErrorResponse) => of({
      //   isbn: '00000',
      //   title: 'Error',
      //   description: err.message,
      //   rating: 1
      // }))
      catchError((err: HttpErrorResponse) => EMPTY)
    )),
  );

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
  }
}
