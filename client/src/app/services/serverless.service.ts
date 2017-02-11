import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ServerlessService {

  constructor(private _http: Http) {
  }

  private endpoints = {
    search: 'https://yyvqqx46dj.execute-api.us-west-1.amazonaws.com/dev/comments/',
  };


  doSearchbyID(ids: Observable<any>, debounceMs = 400) {
    return ids
      .debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(id => this.rawSearchByID(id));
  }


  rawSearchByID(id): Observable<any> {
    return this._http.get(`${this.endpoints.search}${id}`)
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
