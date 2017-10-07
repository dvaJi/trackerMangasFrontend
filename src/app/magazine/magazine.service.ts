import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Magazine } from '../shared/model/magazine';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  magazine: () => `/magazine`,
  publishers: () => `/magazine/publisher`
};

@Injectable()
export class MagazineService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getMagazine(): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({'Authorization': this.auth.credentials.token})
    });
    return this.http.get(routes.magazine(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Magazine.'));
  }

  setMagazine(context: Magazine): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': this.auth.credentials.token,
        'Content-Type': false,
        'Accept': 'application/json'})
    });
    return this.http.post(routes.magazine(), context, options)
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
    });
  }

  getPublisher(): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({'Authorization': this.auth.credentials.token})
    });
    return this.http.get(routes.publishers(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Publishers.'));
  }

}
