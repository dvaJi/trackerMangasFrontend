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
  staff: (s: StaffContext) => `/staffs?id=${s.id}`
};

export class StaffContext {
  id?: number;
  q?: string;
  limit?= 10;
}

@Injectable()
export class StaffService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  /*
   * /Obtener los staff.
   */
  getStaffs(): Observable<Staff> {
    return this.http.get(routes.staffs())
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No hay staffs.'))
      );
  }

  /*
   * /Obtener staff por nombre.
   */
  getStaffsByName(context?: StaffContext): Observable<any> {
    return this.http.get(routes.staffsByName(context))
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontró el staff.'))
      );
  }

  /*
   * /Obtener staff por id.
   */
  getStaff(context: StaffContext): Observable<Staff> {
    return this.http.get(routes.staff(context))
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('No se encontró staff.'))
      );
  }

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
    return this.http.post(routes.staffs(), context, options)
      .pipe(
      map((res: Response) => res.json()),
      flatMap((data: any) => of(data))
      );
  }

}
