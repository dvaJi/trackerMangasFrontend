import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Magazine } from './../../shared/model/magazine';
import { MagazineService } from './../magazine.service';

@Component({
  selector: 'app-magazine-detail',
  templateUrl: './magazine-detail.component.html',
  styleUrls: ['./magazine-detail.component.scss']
})
export class MagazineDetailComponent implements OnInit {

  magazine: Magazine;
  isLoading: boolean;

  constructor(private magazineService: MagazineService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.magazineService.getMagazine(id)
      .finally(() => { this.isLoading = false; })
      .subscribe((magazine: Magazine) => { this.magazine = magazine; });
  }

}
