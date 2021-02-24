import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
      catchError((err: HttpErrorResponse) => of({
        isbn: '00000',
        title: 'Error',
        description: err.message,
        rating: 1
      }))
    )),
  );

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
  }
}
