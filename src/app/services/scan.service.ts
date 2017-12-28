import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, flatMap } from 'rxjs/operators';
import Scan from './../models/scan';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
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
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No hay scans.'))
      );
  }

  getScan(context: ScanContext): Observable<Scan> {
    return this.http.get(routes.scan(context))
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontró el scan.'))
      );
  }

  setScan(context: Scan): Observable<Scan> {
    if (this.auth.credentials === null) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'
      })
    });
    return this.http.post(routes.scans(), context, options)
      .pipe(
      map((res: Response) => res.json()),
      flatMap((data: any) => of(data))
      );
  }

  searchScans(context: ScanContext): Observable<Scan> {
    return this.http.get(routes.search(context))
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontraron scans.'))
      );
  }

}
