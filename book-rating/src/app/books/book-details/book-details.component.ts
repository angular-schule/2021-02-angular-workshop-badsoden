import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {

    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('isbn')),
      switchMap(isbn => this.bs.getSingleBook(isbn))
    ).subscribe(book => console.log(book));
  }


}
