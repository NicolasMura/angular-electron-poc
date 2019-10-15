import { Component, OnInit } from '@angular/core';
import { fadeInOutAnimation } from 'src/app/shared/animations/fade-in-out';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOutAnimation]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
