import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { SerieService } from './serie.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  serie: string;
  isLoading: boolean;

  constructor(private serieService: SerieService) {}

  ngOnInit() {
    this.isLoading = true;
    this.serieService.getRandomQuote({ category: 'dev' })
      .finally(() => { this.isLoading = false; })
      .subscribe((quote: string) => { this.serie = quote; });
  }

}
