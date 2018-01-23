import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Release, Scan } from '@app/models';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { AuthenticationService } from '@app/core';

const routes = {
  release: () => `/release/list`,
  releaseSet: () => `/release`,
  pendingReleases: (r: ReleaseContext) => `/release/pending?id=${r.id}`,
  updatePendingRelease: (c: StatusPendingReleaseContext) => {
    return `/release/update_pending_release?id=${c.id}&status=${c.status}&reason=${c.reason}`;
  }
};

export interface ReleaseContext {
  id?: number;
}

export interface StatusPendingReleaseContext {
  id: number;
  status: boolean;
  reason?: string;
}

@Injectable()
export class ReleaseService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getReleases(): Observable<Release> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http.get(routes.release(), options).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, no hay releases.'))
    );
  }

  getPendingReleases(context: ReleaseContext): Observable<Release[]> {
    if (!this.auth.isAuthenticated()) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'
      })
    });
    return this.http.get(routes.pendingReleases(context), options).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, no hay releases por validar.'))
    );
  }

  updatePendingReleases(context: StatusPendingReleaseContext): Observable<Release[]> {
    if (!this.auth.isAuthenticated()) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'
      })
    });
    return this.http.get(routes.updatePendingRelease(context), options).pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, no hay releases por validar.'))
    );
  }

  setRelease(context: Release): Observable<Release> {
    if (!this.auth.isAuthenticated()) {
      return Observable.throw(new Error('Error, no logeado'));
    }
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'
      })
    });
    return this.http.post(routes.releaseSet(), context, options).pipe(
      map((res: Response) => res.json()),
      flatMap((data: any) => of(data))
    );
  }
}
