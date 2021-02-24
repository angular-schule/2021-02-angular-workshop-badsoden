import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {

  @Output()
  create = new EventEmitter<Book>();

  // works with v12
  bookForm = new FormGroup({
    isbn: new FormControl('', [Validators.required, Validators.minLength(3)]),
    title: new FormControl('', Validators.required),
    description: new FormControl()
  });

  loading = false; // geht nur ohne OnPush

  books$ = this.bookForm.get('title').valueChanges.pipe(
    filter(term => !!term),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(() => this.loading = true),
    switchMap(term => this.bs.search(term).pipe(
      catchError(() => EMPTY)
    )),
    tap(() => this.loading = true)
  );

  constructor(private bs: BookStoreService) {}

  isValid(name: string): boolean {
    const control = this.bookForm.get(name);
    return control.touched && control.invalid;
  }

  hasError(name: string, code: string): boolean {
    return undefined; // TODO
  }

  submitForm(): void {
    const newBook = {
      ...this.bookForm.value,
      rating: 1
    };

    this.create.emit(newBook);
    this.bookForm.reset();
  }
}
