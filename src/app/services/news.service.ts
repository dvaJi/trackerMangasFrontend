import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Poll, News } from '@app/models';
import { AuthenticationService } from '@app/core';

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
        let options = new RequestOptions();
        if (this.auth.isAuthenticated()) {
            options = new RequestOptions({
                headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
            });
        }
        return this.http.get(routes.news(context), options)
            .pipe(
            map((res: Response) => res.json()),
            catchError(() => of('Error, no se encontró la noticia.'))
            );
    }

    getAllNews(): Observable<News[]> {
        let options = new RequestOptions();
        if (this.auth.isAuthenticated()) {
            options = new RequestOptions({
                headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
            });
        }
        return this.http.get(routes.allNews(), options)
            .pipe(
            map((res: Response) => res.json()),
            catchError(() => of('Error, no se encontraron noticias.'))
            );
    }

}
