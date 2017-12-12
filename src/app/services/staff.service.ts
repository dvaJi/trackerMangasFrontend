import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Staff from './../models/staff';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  staffs: () => `/staffs`,
  staffsByName: (c: StaffContext) => `/staffs/search?q=${c.q}&limit=${c.limit}`,
  staff: (s: StaffContext) => `/staffs?id=${s.id}`
};

export class StaffContext {
  id?: number;
  q?: string;
  limit? = 10;
}

@Injectable()
export class StaffService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  /*
   * /Obtener los staff.
   */
  getStaffs(): Observable<Staff> {
    return this.http.get(routes.staffs())
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Staff.'));
  }

  /*
   * /Obtener staff por nombre.
   */
  getStaffsByName(context?: StaffContext): Observable<any> {
    return this.http.get(routes.staffsByName(context))
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Staff.'));
  }

  /*
   * /Obtener staff por id.
   */
  getStaff(context: StaffContext): Observable<Staff> {
    return this.http.get(routes.staff(context))
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Staff.'));
  }

  setStaff(context: Staff): Observable<Staff> {
    if (this.auth.credentials === null) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'})
    });
    return this.http.post(routes.staffs(), context, options)
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
    });
  }

}
