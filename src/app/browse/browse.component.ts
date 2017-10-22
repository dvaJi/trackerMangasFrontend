import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Serie } from '../shared/model/serie';

import { SerieService } from '../serie/serie.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  isLoading: boolean;
  trendingThisWeek: Array<Serie> = [];
  recentlyAdded: Array<Serie> = [];
  highRatedSeries: Array<Serie> = [];
  mostPopularSeries: Array<Serie> = [];
  trendingThisMonth: Array<Serie> = [];

  constructor(private serieService: SerieService) { }

  ngOnInit() {
    this.isLoading = true;
    // Populares de la Semana
    this.serieService.getSeries({ type: 'Manga', order: 'popularity', time: 'weekly', limit: 5 })
      .finally(() => { this.isLoading = false; })
      .subscribe((series: Array<Serie>) => { this.trendingThisWeek = series; });

    // Agregados recuentemente
    this.serieService.getSeries({ type: 'Manga', order: 'created', time: '', limit: 5 })
      .finally(() => { this.isLoading = false; })
      .subscribe((series: Array<Serie>) => { this.recentlyAdded = series; });

    // Más votados
    this.serieService.getSeries({ type: 'Manga', order: 'rated', time: '', limit: 5 })
      .finally(() => { this.isLoading = false; })
      .subscribe((series: Array<Serie>) => { this.highRatedSeries = series; });

    // Más populares
    this.serieService.getSeries({ type: 'Manga', order: 'popularity', time: '', limit: 5 })
      .finally(() => { this.isLoading = false; })
      .subscribe((series: Array<Serie>) => { this.mostPopularSeries = series; });

    // Populares del mes
    this.serieService.getSeries({ type: 'Manga', order: 'popularity', time: 'month', limit: 5 })
      .finally(() => { this.isLoading = false; })
      .subscribe((series: Array<Serie>) => { this.trendingThisMonth = series; });
  }

}
