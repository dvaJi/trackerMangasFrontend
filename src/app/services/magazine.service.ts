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
  pendingMagazine: (m: MagazineContext) => `/magazine/pending?id=${m.id}`,
  publishers: (p: PublisherContext) => `/magazine/publisher?q=${p.q}&limit=${p.limit}`,
  updatePendingMagazine: (c: StatusPendingMagazineContext) => {
    return `/magazine/update_pending_magazine?id=${c.id}&status=${c.status}&reason=${c.reason}`;
  }
};

export class MagazineContext {
  id?: number;
  q?: string;
  limit?= 10;
}

export class PublisherContext {
  q?: string;
  limit = 10;
}

export interface StatusPendingMagazineContext {
  id: number;
  status: boolean;
  reason?: string;
}

@Injectable()
export class MagazineService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  /**
   * Retorna una lista de Revistas
   * @returns {Observable<Magazine>}
   * @memberof MagazineService
   * @author dvaJi
   */
  getMagazines(): Observable<Magazine> {
    return this.http.get(routes.magazines()).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, no hay revistas.'))
    );
  }

  /**
   * Retorna una Revista según su id
   * @param {number} id
   * @returns {Observable<Magazine>}
   * @memberof MagazineService
   * @author dvaJi
   */
  getMagazine(id: number): Observable<Magazine> {
    return this.http.get(routes.magazine(id)).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, revista no encontrada.'))
    );
  }

  /**
   * Obtiene una lista de las revistas pendientes de la tabla pending_magazine
   * @param {MagazineContext} context
   * @returns {Observable<Magazine[]>}
   * @memberof MagazineService
   * @author dvaJi
   */
  getPendingMagazine(context: MagazineContext): Observable<Magazine[]> {
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
    return this.http.get(routes.pendingMagazine(context), options).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, revista no encontrada.'))
    );
  }

  /**
   * Actualiza la revista pendiente, si es aprobada se crea una
   * nueva revista en la tabla [magazines] y la columna status_approbal es 1
   * si es rechazada la columna pasa a ser -1
   * @param {StatusPendingMagazineContext} context
   * @returns {Observable<Magazine[]>}
   * @memberof MagazineService
   */
  updatePendingMagazine(context: StatusPendingMagazineContext): Observable<Magazine[]> {
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
    return this.http.get(routes.updatePendingMagazine(context), options).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, revista no encontrada.'))
    );
  }

  /**
   * Busca y retorna una lista de Revistas por su nombre
   * @param {MagazineContext} context
   * @returns {Observable<Magazine>}
   * @memberof MagazineService
   * @author dvaJi
   */
  searchMagazine(context: MagazineContext): Observable<Magazine> {
    return this.http.get(routes.searchmagazine(context)).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, revista no encontrada.'))
    );
  }

  /**
   * Método POST que envía una Revista para pasar a la tabla pending_magazine
   * @param {Magazine} context
   * @returns {Observable<Magazine>}
   * @memberof MagazineService
   * @author dvaJi
   */
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
    return this.http.post(routes.magazines(), context, options).pipe(
      map((res: Response) => res.json()),
      flatMap((data: any) => of(data))
    );
  }

  /**
   * Obtiene una lista de Editoriales según su nombre
   * @param {PublisherContext} context
   * @returns {Observable<Publisher>}
   * @memberof MagazineService
   * @author dvaJi
   */
  getPublisher(context: PublisherContext): Observable<Publisher> {
    context.q = (context.q !== '') ? context.q : ' ';
    return this.http.get(routes.publishers(context)).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, no hay Editoriales.'))
    );
  }

}
