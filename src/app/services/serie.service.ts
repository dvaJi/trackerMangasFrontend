import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, flatMap } from 'rxjs/operators';
import Serie from './../models/serie';
import Genre from './../models/genre';
import Staff from './../models/staff';
import Magazine from './../models/magazine';
import Demographic from './../models/demographic';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  getSerie: (c: SerieContext) => `/serie/page/${c.id}`,
  setSerie: () => `/serie`,
  series: (query: any) => `/serie/list?type=${query.type}&order=${query.order}&time=${query.time}&limit=${query.limit}`,
  search: (c: SerieContext) => `/serie/search?q=${c.q}&limit=${c.limit}`,
  genres: () => `/genre/list`,
  demographic: () => `/demographic/list`
};

export interface SerieContext {
  id?: number;
  q?: string;
  limit?: number;
}

@Injectable()
export class SerieService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getSerie(context: SerieContext): Observable<Serie> {
    return this.http.get(routes.getSerie(context))
    .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontró la serie.'))
      );
  }

  setSerie(context: Serie): Observable<Serie> {
    if (this.auth.credentials === null) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'
      })
    });
    return this.http.post(routes.setSerie(), context, options)
    .pipe(
      map((res: Response) => res.json()),
      flatMap((data: any) => of(data))
      );
  }

  getSeries(query: any): Observable<Array<Serie>> {
    return this.http.get(routes.series(query))
    .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No hay series.'))
      );
  }

  /*
  * Buscar series por sus nombres.
  */
  searchSeries(context: SerieContext): Observable<Serie> {
    return this.http.get(routes.search(context))
    .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontraron series para ' + context.q))
      );
  }

  /*
   * Obtener todos los géneros de las series.
   */
  getGenres(): Observable<Genre[]> {
    return this.http.get(routes.genres())
    .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No hay géneros.'))
      );
  }

  /*
   * Obtener todos las demografias.
   */
  getDemographics(): Observable<Demographic[]> {
    return this.http.get(routes.demographic())
    .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No hay demografías.'))
      );
  }

}
