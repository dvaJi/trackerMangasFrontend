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

  series: Serie;
  isLoading: boolean;

  constructor(private serieService: SerieService) {}

  ngOnInit() {
    this.isLoading = true;
    /* this.serieService.getSeries()
      .finally(() => { this.isLoading = false; })
      .subscribe((serie: Serie) => { this.series = serie; });*/
  }

}
