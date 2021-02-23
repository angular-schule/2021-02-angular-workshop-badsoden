import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: '**', redirectTo: '/books' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true,
    // scrollPositionRestoration: 'enabled' // we need proper state management here
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
