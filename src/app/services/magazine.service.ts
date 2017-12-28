import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';

import { AuthenticationService } from '../core/authentication/authentication.service';

import Magazine from './../models/magazine';
import Publisher from '../models/publisher';

const routes = {
  magazines: () => `/magazine`,
  magazine: (id: number) => `/magazine?id=${id}`,
  searchmagazine: (m: MagazineContext) => `/magazine/search?q=${m.q}&limit=${m.limit}`,
  publishers: (p: PublisherContext) => `/magazine/publisher?q=${p.q}&limit=${p.limit}`
};

export class MagazineContext {
  id?: number;
  q?: string;
  limit = 10;
}

export class PublisherContext {
  q?: string;
  limit = 10;
}

@Injectable()
export class MagazineService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getMagazines(): Observable<Magazine> {
    return this.http.get(routes.magazines())
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, no hay revistas.'))
      );
  }

  getMagazine(id: number): Observable<Magazine> {
    return this.http.get(routes.magazine(id))
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, revista no encontrada.'))
      );
  }

  searchMagazine(context: MagazineContext): Observable<Magazine> {
    return this.http.get(routes.searchmagazine(context))
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, revista no encontrada.'))
      );
  }

  setMagazine(context: Magazine): Observable<Magazine> {
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
    return this.http.post(routes.magazines(), context, options)
      .pipe(
      map((res: Response) => res.json()),
      flatMap((data: any) => of(data))
      );
  }

  getPublisher(context: PublisherContext): Observable<Publisher> {
    context.q = (context.q !== '') ? context.q : ' ';
    return this.http.get(routes.publishers(context))
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, no hay Editoriales.'))
      );
  }

}
