import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { mergeMap, concatMap, switchMap, exhaustMap } from 'rxjs/operators';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-higherorder',
  templateUrl: './higherorder.component.html',
})
export class HigherorderComponent implements OnInit {

  logStream$ = new ReplaySubject<string>();
  source$ = new Subject<string>();
  result$: Observable<string>;

  constructor(private es: ExerciseService) { }

  ngOnInit() {

    /**
     * Löse für jedes Tier-Event im source$-Stream ein Echo aus.
     * Die Methode this.es.echo() gibt ein Observable zurück, das Echos produziert.
     * Probiere aus, wie sich concatMap, mergeMap, switchMap und exhaustMap unterschiedlich verhalten.
     *
     * Quelle: this.source$
     * Ziel: this.result$
     */

    /**************!!**************/

    this.result$ = this.source$.pipe(
      concatMap(tier => this.es.echo(tier))
    );

    /**************!!**************/

    this.source$.subscribe(value => this.logStream$.next(`SOURCE: ${value}`));
    this.result$.subscribe(value => this.logStream$.next(`🚀 ${value}`));
  }

  echoTest() {
    this.es.echo('TEST').subscribe(value => this.logStream$.next(value));
  }

  sendValue(value: string) {
    this.source$.next(value);
  }

}
