import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.paramMap
      .subscribe(paramMap => console.log(paramMap.get('isbn')));
  }

  ngOnInit(): void {
  }

}
