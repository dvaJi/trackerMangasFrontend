import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Poll } from './poll';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { News } from './news';

const routes = {
    news: (n: NewsContext) => `/news?id=${n.id}&stub=${n.stub}`,
    allNews: () => `/news`
};

export interface NewsContext {
    id?: number;
    stub?: string;
}

@Injectable()
export class NewsService {

    constructor(private http: Http, private auth: AuthenticationService) { }

    getNews(context: NewsContext): Observable<News> {
        const options = new RequestOptions({
            headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
        });
        return this.http.get(routes.news(context), options)
            .map((res: Response) => res.json())
            .map(body => body)
            .catch(() => Observable.of('Error, could not news.'));
    }

    getAllNews(): Observable<News[]> {
        const options = new RequestOptions({
            headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
        });
        return this.http.get(routes.allNews(), options)
            .map((res: Response) => res.json())
            .map(body => body)
            .catch(() => Observable.of('Error, could not news.'));
    }

}
