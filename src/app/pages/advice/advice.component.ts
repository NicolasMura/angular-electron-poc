import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOutAnimation } from '../../shared/animations/fade-in-out';
import { VisagismeService } from 'src/app/services/visagisme/visagisme.service';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
  animations: [fadeInOutAnimation]
})
export class AdviceComponent implements OnInit {
  subscription: Subscription;

  constructor(
    private router: Router,
    public visagismeService: VisagismeService,
    private logger: NGXLogger
  ) {
    // this.logger.debug(visagismeService.capture);
    this.logger.debug(visagismeService.faceAttributes);
    if ( !visagismeService.faceAttributes ) {
      this.router.navigateByUrl('/capture');
    }
  }

  ngOnInit() {
    // this.subscription = this.visagismeService.getFaceAttributes().subscribe();
  }

}
