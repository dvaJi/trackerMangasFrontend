import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Serie, Genre, Staff, Magazine, Demographic, SerieChangelog } from '@app/models';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { AuthenticationService } from '@app/core';

const routes = {
  getSerie: (c: SerieContext) => `/serie/page/${c.id}`,
  setSerie: () => `/serie/add_revision`,
  series: (c: SerieContext) => `/serie/list?type=${c.type}&order=${c.order}&time=${c.time}&limit=${c.limit}`,
  search: (c: SerieContext) => `/serie/search?q=${c.q}&limit=${c.limit}`,
  history: (c: SerieContext) => `/serie/history?id=${c.id}`,
  genres: (c: SerieContext) => `/genre/list?id_serie=${c.id}`,
  demographic: () => `/demographic/list`,
  getPendingSerie: (c: SerieContext) => `/serie/pending?id=${c.id}`,
  updatePendingSerie: (c: StatusPendingSerieContext) => {
    return `/serie/update_pending_serie?id=${c.id}&status=${c.status}&reason=${c.reason}`;
  }
};

export interface SerieContext {
  id?: number;
  q?: string;
  limit?: number;
  type?: string;
  order?: string;
  time?: string;
}

export interface StatusPendingSerieContext {
  id: number;
  status: boolean;
  reason?: string;
}

@Injectable()
export class SerieService {
  constructor(private http: Http, private auth: AuthenticationService) {}

  /**
   * Obtiene una Serie por su ID
   * @param {SerieContext} context
   * @returns {Observable<Serie>}
   * @memberof SerieService
   * @author dvaJi
   */
  getSerie(context: SerieContext): Observable<Serie> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http
      .get(routes.getSerie(context), options)
      .pipe(map((res: Response) => res.json()), catchError(() => of('No se encontró la serie.')));
  }

  /**
   * Método POST que envía una Serie para pasar a la tabla pending_serie
   * @param {Serie} context
   * @returns {Observable<Serie>}
   * @memberof SerieService
   * @author dvaJi
   */
  setSerie(context: Serie): Observable<Serie> {
    if (!this.auth.isAuthenticated()) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        Accept: 'application/json'
      })
    });
    return this.http
      .post(routes.setSerie(), context, options)
      .pipe(map((res: Response) => res.json()), flatMap((data: any) => of(data)));
  }

  /**
   * Obtiene una lista de series según parametros.
   * @param {SerieContext} context
   * @returns {Observable<Serie[]>}
   * @memberof SerieService
   * @author dvaJi
   */
  getSeries(context: SerieContext): Observable<Serie[]> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http
      .get(routes.series(context), options)
      .pipe(map((res: Response) => res.json()), catchError(() => of('No hay series.')));
  }

  /**
   * Obtiene la serie pendiente por id, si esta es
   * undefined, trae la lista de series pendientes
   * @param {SerieContext} context
   * @returns {Observable<Array<Serie>>}
   * @memberof SerieService
   * @author dvaJi
   */
  getPendingSeries(context: SerieContext): Observable<Array<Serie>> {
    if (!this.auth.isAuthenticated()) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        Accept: 'application/json'
      })
    });
    return this.http
      .get(routes.getPendingSerie(context), options)
      .pipe(map((res: Response) => res.json()), catchError(() => of('No hay series pendientes.')));
  }

  /**
   * Actualiza la serie pendiente, si es aprobada se crea una
   * nueva serie en la tabla [series] y la columna status_approbal es 1
   * si es rechazada la columna pasa a ser -1
   * @param {StatusPendingSerieContext} context
   * @returns {Observable<Serie>}
   * @memberof SerieService
   * @author dvaJi
   */
  updatePendingSeries(context: StatusPendingSerieContext): Observable<Serie> {
    if (!this.auth.isAuthenticated()) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        Accept: 'application/json'
      })
    });
    return this.http
      .get(routes.updatePendingSerie(context), options)
      .pipe(map((res: Response) => res.json()), flatMap((data: any) => of(data)));
  }

  /**
   * Busca y trae una lista de Series según su nombre.
   * TODO: debe filtrar las series 'repetidas', puesto que trae todos los nombres alternativos
   * @param {SerieContext} context
   * @returns {Observable<Serie[]>}
   * @memberof SerieService
   * @author dvaJi
   */
  searchSeries(context: SerieContext): Observable<Serie[]> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http
      .get(routes.search(context), options)
      .pipe(map((res: Response) => res.json()), catchError(() => of('No se encontraron series para ' + context.q)));
  }

  /**
   * Historial/Registro de cambios de una serie
   * @param {SerieContext} context para obtener el id
   * @returns {Observable<SerieChangelog[]>} los cuales contienen los detalles tambien.
   * @memberof SerieService
   */
  getHistory(context: SerieContext): Observable<SerieChangelog[]> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http
      .get(routes.history(context), options)
      .pipe(map((res: Response) => res.json()), catchError(() => of('No se encontraron registros para ' + context.q)));
  }

  /**
   * Obtiene una lista de los géneros disponibles
   * @returns {Observable<Genre[]>}
   * @memberof SerieService
   * @author dvaJi
   */
  getGenres(context: SerieContext): Observable<Genre[]> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http
      .get(routes.genres(context), options)
      .pipe(map((res: Response) => res.json()), catchError(() => of('No hay géneros.')));
  }

  /**
   * Obtiene una lista las demografías disponibles
   * @returns {Observable<Demographic[]>}
   * @memberof SerieService
   * @author dvaJi
   */
  getDemographics(): Observable<Demographic[]> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http
      .get(routes.demographic(), options)
      .pipe(map((res: Response) => res.json()), catchError(() => of('No hay demografías.')));
  }
}
