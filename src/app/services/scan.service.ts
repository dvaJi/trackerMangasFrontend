import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Scan from './../models/scan';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  scans: () => `/scan`,
  scan: (s: ScanContext) => `/scan?id=${s.id}`,
  search: (s: ScanContext) => `/scan/search?q=${s.q}&limit=${s.limit}`
};

export class ScanContext {
  id?: number;
  q?: string;
  limit?: 10;
}

@Injectable()
export class ScanService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getScans(): Observable<Scan> {
    return this.http.get(routes.scans())
      .map((res: Response) => res.json())
      .catch(() => Observable.of('Error, no hay Scan.'));
  }

  getScan(context: ScanContext): Observable<Scan> {
    return this.http.get(routes.scan(context))
      .map((res: Response) => res.json())
      .catch(() => Observable.of('Error, no hay Scan.'));
  }

  setScan(context: Scan): Observable<Scan> {
    if (this.auth.credentials === null) {
      return Observable.throw(new Error('Error, no logeado'));
    }
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

  searchScans(context: ScanContext): Observable<Scan> {
    return this.http.get(routes.search(context))
      .map((res: Response) => res.json())
      .catch(() => Observable.of('Error, No se encontraron scans.'));
  }

}
