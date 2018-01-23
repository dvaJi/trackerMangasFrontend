import { finalize } from 'rxjs/operators/finalize';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Serie, Staff } from '@app/models';
import { SerieService } from '@app/services';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.scss']
})
export class SeriesDetailComponent implements OnInit {

  serie: Serie;
  isLoading: boolean;
  staff: Staff[];

  constructor(private serieService: SerieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.serieService.getSerie({ id: id })
      .pipe(finalize(() => {
        this.isLoading = false;
        this.staff = this.serie.staff;
      }))
      .subscribe((serie: Serie) => { this.serie = serie; });
  }

}
