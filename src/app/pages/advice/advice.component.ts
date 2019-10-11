import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../../shared/animations/fade-in-out';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter', // when a DOM element is being added
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
            style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', // when a DOM element is being removed
          [
            style({ opacity: 1 }),
            animate('1s ease-in',
            style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AdviceComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit - AdviceComponent');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy - AdviceComponent');
  }

}
