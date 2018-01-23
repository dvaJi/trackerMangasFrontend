import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Poll } from '@app/models';
import { AuthenticationService } from '@app/core';

const routes = {
  polls: (p: PollContext) => `/poll?latest=${p.latest}&active=${p.active}`,
  poll: () => `/poll`
};

export interface PollContext {
  latest?: boolean;
  active?: boolean;
  answer?: number;
  user?: string;
}

@Injectable()
export class PollsService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getPoll(context: PollContext): Observable<Poll> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http.get(routes.polls(context), options)
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, No se pudo obtener la encuesta.'))
      );
  }

  getPolls(context: PollContext): Observable<Poll[]> {
    let options = new RequestOptions();
    if (this.auth.isAuthenticated()) {
      options = new RequestOptions({
        headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
      });
    }
    return this.http.get(routes.polls(context), options)
      .pipe(
      map((res: Response) => res.json()),
      catchError(() => of('Error, No se pudieron obtener las encuestas.'))
      );
  }

  setPoll(answer: number): Observable<string> {
    if (!this.auth.isAuthenticated()) {
      return _throw('Inicie sesión para votar.');
    }
    const answerContext: PollContext = {
      answer: answer,
      user: this.auth.credentials.username
    };
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'
      })
    });
    return this.http.post(routes.poll(), answerContext, options)
      .pipe(
      map((res: Response) => res.json()),
      flatMap((data: any) => of(data))
      );
  }

}
