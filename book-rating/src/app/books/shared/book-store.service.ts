import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.backendUrl);
  }

  getSingleBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(environment.backendUrl + isbn);
  }

  search(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(environment.backendUrl + 'search/' + term);
  }
}
