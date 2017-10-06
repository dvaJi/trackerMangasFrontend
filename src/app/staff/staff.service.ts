import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Staff } from '../shared/model/staff';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  staff: () => `/staffs`
};

@Injectable()
export class StaffService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getStaff(): Observable<Staff> {
    const options = new RequestOptions({
      headers: new Headers({'Authorization': this.auth.credentials.token})
    });
    return this.http.get(routes.staff(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Staff.'));
  }

  setStaff(context: Staff): Observable<Staff> {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': this.auth.credentials.token,
        'Content-Type': false,
        'Accept': 'application/json'})
    });
    return this.http.post(routes.staff(), context, options)
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
    });
  }

}
