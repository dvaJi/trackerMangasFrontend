import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Serie } from '../shared/model/serie';

import { SerieService } from './serie.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  serie: Serie;
  isLoading: boolean;
  staff: string[];

  constructor(private serieService: SerieService) {}

  ngOnInit() {
    this.isLoading = true;
    this.serieService.getSerie({ id: 1 })
      .finally(() => {
        this.isLoading = false;
        this.staff = this.serie.staff;
        console.log(this.staff);
      })
      .subscribe((serie: Serie) => { this.serie = serie; });
  }

}
