import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Serie } from '../../shared/model';

import { SerieService } from './../serie.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  series: Serie[];
  isLoading: boolean;
  staff: string[];

  constructor(private serieService: SerieService) {}

  ngOnInit() {
    this.isLoading = true;
    this.serieService.getSeries({ type: 'Manga', order: 'stub', time: '', limit: 15 })
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe((series: Serie[]) => { this.series = series; });
  }

}
