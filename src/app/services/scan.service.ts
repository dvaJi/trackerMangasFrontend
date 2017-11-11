import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Scan from './../models/scan';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  scans: () => `/scan`,
  scan: (id: number) => `/scan?id=${id}`
};

@Injectable()
export class ScanService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getScans(): Observable<Scan> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.scans(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Scan.'));
  }

  getScan(id: number): Observable<Scan> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.scan(id), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Scan.'));
  }

  setScan(context: Scan): Observable<Scan> {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'})
    });
    return this.http.post(routes.scans(), context, options)
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
    });
  }

}
