import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Magazine from './../models/magazine';
import Publisher from '../models/publisher';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

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
      .catch(() => Observable.of('Error, revista no encontrada.'));
  }

  searchMagazine(context: MagazineContext): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.searchmagazine(context), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, No se encontró la revista.'));
  }

  setMagazine(context: Magazine): Observable<Magazine> {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'
      })
    });
    return this.http.post(routes.magazines(), context, options)
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
      });
  }

  getPublisher(context: PublisherContext): Observable<Publisher> {
    context.q = (context.q !== '') ? context.q : ' ';
    return this.http.get(routes.publishers(context))
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Publishers.'));
  }

}
