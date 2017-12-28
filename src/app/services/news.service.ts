import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import Poll from './../models/poll';
import News from './../models/news';
import { AuthenticationService } from '../core/authentication/authentication.service';

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
        return this.http.get(routes.news(context))
            .pipe(
            map((res: Response) => res.json()),
            catchError(() => of('Error, no se encontró la noticia.'))
            );
    }

    getAllNews(): Observable<News[]> {
        return this.http.get(routes.allNews())
            .pipe(
            map((res: Response) => res.json()),
            catchError(() => of('Error, no se encontraron noticias.'))
            );
    }

}
