import {Component, OnInit} from '@angular/core';
import {ServerlessService} from "../services/serverless.service";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-instant-search',
  templateUrl: './instant-search.component.html'
})

export class InstantSearchComponent implements OnInit {

  public spinner: boolean;
  public result;

  code$ = new Subject<any>();

  constructor(private serverlessService: ServerlessService) {
  }

  ngOnInit() {
    this.serverlessService.doSearchbyID(this.code$)
      .subscribe(
        res => {
          this.spinner = false;
          this.result = res;
        },
        err => {
          this.spinner = false;
          this.result = `An Error! ${err.json().error}`
        }
      );
  }

  onChange() {
    this.spinner = true;
  }

}
