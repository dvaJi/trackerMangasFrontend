import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Magazine from './../models/magazine';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  magazines: () => `/magazine`,
  magazine: (id: number) => `/magazine?id=${id}`,
  publishers: () => `/magazine/publisher`
};

@Injectable()
export class MagazineService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getMagazines(): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.magazines(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Magazine.'));
  }

  getMagazine(id: number): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.magazine(id), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Magazine.'));
  }

  setMagazine(context: Magazine): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'})
    });
    return this.http.post(routes.magazines(), context, options)
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
    });
  }

  getPublisher(): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.publishers(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Publishers.'));
  }

}
