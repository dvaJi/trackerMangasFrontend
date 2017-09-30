import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Release } from './release';
import { Scan } from './scan';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  release: () => `/release/list`,
  releaseSet: () => `/release`,
  scans: () => `/scan/list`
};

@Injectable()
export class ReleaseService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getReleases(): Observable<Release> {
    const options = new RequestOptions({
      headers: new Headers({'Authorization': this.auth.credentials.token})
    });
    return this.http.get(routes.release(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay releases.'));
  }

  setRelease(context: Release): Observable<Release> {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': this.auth.credentials.token,
        'Content-Type': false,
        'Accept': 'application/json'})
    });
    return this.http.post(routes.releaseSet(), context, options)
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
    });
  }

  getScans(): Observable<Scan> {
    const options = new RequestOptions({
      headers: new Headers({'Authorization': this.auth.credentials.token})
    });
    return this.http.get(routes.scans(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay scans.'));
  }

}
