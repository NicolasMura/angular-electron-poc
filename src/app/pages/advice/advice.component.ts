import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../shared/animations/fade-in-out';
import { trigger, transition, style, animate } from '@angular/animations';
import { VisagismeService } from 'src/app/services/visagisme/visagisme.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class AdviceComponent implements OnInit {
  subscription: Subscription;

  constructor(
    private router: Router,
    public visagismeService: VisagismeService
  ) {
    console.log(visagismeService.capture);
    console.log(visagismeService.faceAttributes);
    // if ( !visagismeService.faceAttributes ) {
    //   this.router.navigateByUrl('/capture');
    // }
  }

  ngOnInit() {
    this.subscription = this.visagismeService.getFaceAttributes().subscribe();
  }

}
