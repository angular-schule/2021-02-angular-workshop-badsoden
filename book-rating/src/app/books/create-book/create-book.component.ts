import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mergeMap, tap } from 'rxjs/operators';
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
    tap(term => console.log(term)),

    // 0. Optional: Suche nicht nach leeren Strings
    // 1. mit Verzögerung
    // 1b. Optional: Nur veränderte Suchbegriffe
    // 2. Veraltete Requests sollen abgebrochen werden
    // 3. die Methode `bs.search()` soll verwendet werden
    // 4. Optional: Mit Ladeanzeige (hinweis: hier "dürft" ihr mal tap() einsetzen)

    // wrong method!
    mergeMap(() => this.bs.getBooks())
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
