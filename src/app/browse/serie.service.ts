import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const routes = {
  quote: (c: SerieQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface SerieQuoteContext {
  // The quote's category: 'nerdy', 'explicit'...
  category: string;
}

@Injectable()
export class SerieService {

  constructor(private http: Http) { }

  getRandomQuote(context: SerieQuoteContext): Observable<string> {
    return this.http.get(routes.quote(context), { cache: true })
      .map((res: Response) => res.json())
      .map(body => body.value)
      .catch(() => Observable.of('Error, could not load joke :-('));
  }

}
