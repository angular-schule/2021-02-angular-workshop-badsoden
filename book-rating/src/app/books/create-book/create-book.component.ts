import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/book';

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

  isValid(name: string): boolean {
    const control = this.bookForm.get(name);
    return control.touched && control.invalid;
  }

  hasError(name: string, code: string): boolean {
    return undefined; // TODO
  }

  submitForm() {
    const newBook = {
      ...this.bookForm.value,
      rating: 1
    };

    this.create.emit(newBook);
    this.bookForm.reset();
  }
}
