import { Component, Input } from '@angular/core';
import { Serie } from '@app/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-serie-card-list',
  template: `
    <div class="explore-section">
        <h6 translate>{{ title }}</h6>
        <div class="media-browse">
          <div class="media-grid container">
            <div class="row" *ngIf="seriesList | async as series">
              <div *ngIf="series.length > 0; else emptyCard">
                <app-serie-card class="cover-card" *ngFor="let serie of series" [serie]="serie"></app-serie-card>
              </div>
              <ng-template #emptyCard>
                <app-serie-card-empty
                    class="cover-card skeleton-loader-background"
                    *ngFor="let serie of fakeSeries">
                </app-serie-card-empty>
              </ng-template>
            </div>
          </div>
        </div>
        <div class="explore-section-more">
          <a href="{{ url }}" translate>Ver más</a>
        </div>
      </div>
  `,
  styles: [
    `
    .explore-section {
        margin-bottom: 50px;
    }
    .media-grid .cover-card {
        background-color: #ddd;
        display: inline-block;
        font-size: 0.87em;
        height: 215px;
        margin-right: 15px;
        margin-top: 5px;
        position: relative;
        width: 150px;
    }
    .explore-section .explore-section-more {
        float: right;
        margin-right: 15px;
        font-size: 12px;
    }
    @keyframes placeholder {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
    }
    .skeleton-loader-background {
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeholder;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
        background-size: 1000px 100px;
        position: relative;
    }
  `,
  ],
})
export class SerieCardListComponent {

  @Input() seriesList: Observable<Serie[]>;
  @Input() title: string;
  @Input() url: string;

  get fakeSeries() {
    const series = [];
    for (let index = 0; index < 5; index++) {
      series.push({ id: index });
    }
    return series;
  }
}
