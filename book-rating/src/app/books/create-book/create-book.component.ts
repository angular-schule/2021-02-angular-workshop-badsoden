import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {

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

    // 1. Definiere den EventEmitter "create"
    // 2. Feuere das Event mit dem neuen Buch als Nutzlast
    // 3. Subscribe dich auf das Event im Dashboard
    // 4. Füge das neue Buch dem Array hinzu --> Achte auf die Unveränderbarkeit vom Array

    this.bookForm.reset();
  }

}
