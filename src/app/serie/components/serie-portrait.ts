import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Serie } from '@app/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-serie-portrait',
  template: `
  <div class="portrait">
    <div class="portrait-bg" [ngStyle]="{ 'background-image': portraitBg}"></div>
    <div class="serie-info container">
      <h1 class="name">{{ name }}</h1> <!--<span class="badge" [ngClass]="badgeColor">{{ type }}</span>-->
      <span class="votes">
        <ngb-rating [(rate)]="rated">
          <ng-template let-fill="fill">
            <span class="star" [class.filled]="fill === 100">&#9733;</span>
          </ng-template>
        </ngb-rating>
        ({{ ratedCount }} votos)
      </span>
      <div>
        <span *ngFor="let name of altNames" class="alt-names">{{ name }}</span>
      </div>
      <div class="follow-button">
        <button type="button" class="btn btn-light"><i class="fa fa-rss" aria-hidden="true"></i> Seguir</button>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./serie-portrait.scss']
})
export class SeriePortraitComponent {
  @Input() serie: Serie;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  get name() {
    return this.serie !== null ? this.serie.name : '';
  }

  get altNames() {
    return this.serie !== null ? this.serie.names : [];
  }

  get type() {
    return this.serie !== null ? this.serie.type : '';
  }

  get portraitBg() {
    const url = this.serie !== null ? this.serie.cover.large.path_full : '';
    return `url(${url})`;
  }

  get rated() {
    return this.serie !== null ? this.serie.rated : 0;
  }

  set rated(rate: number) {
    this.rated = rate;
  }

  get ratedCount() {
    return this.serie !== null ? this.serie.rated_count : 0;
  }

  get badgeColor() {
    switch (this.type.toUpperCase()) {
      case 'MANGA':
        return 'manga';
      case 'MANHWA':
        return 'manhwa';
      default:
        return '';
    }
  }
}
