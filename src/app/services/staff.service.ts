import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, flatMap } from 'rxjs/operators';
import Staff from './../models/staff';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  staffs: () => `/staffs`,
  staffsByName: (c: StaffContext) => `/staffs/search?q=${c.q}&limit=${c.limit}`,
  staff: (s: StaffContext) => `/staffs?id=${s.id}`,
  pendingStaff: (s: StaffContext) => `/staffs/pending?id=${s.id}`,
  updatePendingStaff: (s: StatusPendingStaffContext) => {
    return `/staffs/update_pending_staff?id=${s.id}&status=${s.status}&reason=${s.reason}`;
  }
};

export class StaffContext {
  id?: number;
  q?: string;
  limit?= 10;
}

export interface StatusPendingStaffContext {
  id: number;
  status: boolean;
  reason?: string;
}

@Injectable()
export class StaffService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  /**
   * Obtiene una lista de staffs
   * @returns {Observable<Staff>}
   * @memberof StaffService
   * @author dvaJi
   */
  getStaffs(): Observable<Staff> {
    return this.http.get(routes.staffs()).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No hay staffs.'))
    );
  }

  /**
   * Busca y trae una lista de Staffs según su nombre.
   * TODO: debe filtrar los staff 'repetidos', puesto que trae todos los nombres alternativos
   * @param {StaffContext} [context]
   * @returns {Observable<any>}
   * @memberof StaffService
   * @author dvaJi
   */
  getStaffsByName(context?: StaffContext): Observable<any> {
    return this.http.get(routes.staffsByName(context)).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontró el staff.'))
    );
  }

  /**
   * Obtiene un staff mediante su id
   * @param {StaffContext} context
   * @returns {Observable<Staff>}
   * @memberof StaffService
   * @author dvaJi
   */
  getStaff(context: StaffContext): Observable<Staff> {
    return this.http.get(routes.staff(context)).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontró staff.'))
    );
  }

  /**
   * Obtiene el staff pendiente por id, si esta es
   * undefined, trae la lista de staffs pendientes
   * @param {StaffContext} context
   * @returns {Observable<Staff[]>}
   * @memberof StaffService
   * @author dvaJi
   */
  getPendingStaff(context: StaffContext): Observable<Staff[]> {
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
    return this.http.get(routes.pendingStaff(context), options).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontró staff.'))
    );
  }

  /**
   * Actualiza el staff pendiente, si es aprobada se crea un
   * nuevo staff en la tabla [staff] y la columna status_approbal es 1
   * si es rechazada la columna pasa a ser -1
   * @param {StatusPendingStaffContext} context
   * @returns {Observable<Staff[]>}
   * @memberof StaffService
   * @author dvaJi
   */
  updatePendingStaff(context: StatusPendingStaffContext): Observable<Staff[]> {
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
    return this.http.get(routes.updatePendingStaff(context), options).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontró staff.'))
    );
  }

  /**
   * Método POST que envía un Staff para pasar a la tabla pending_staff
   * @param {Staff} context
   * @returns {Observable<Staff>}
   * @memberof StaffService
   * @author dvaJi
   */
  setStaff(context: Staff): Observable<Staff> {
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
    return this.http.post(routes.staffs(), context, options).pipe(
      map((res: Response) => res.json()),
      flatMap((data: any) => of(data))
    );
  }

}
