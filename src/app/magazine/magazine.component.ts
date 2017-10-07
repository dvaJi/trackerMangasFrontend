import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { Magazine } from '../shared/model/magazine';
import { MagazineService } from './magazine.service';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss']
})
export class MagazineComponent implements OnInit {

  magazines: Magazine;
  isLoading: boolean;

  constructor(private magazineService: MagazineService) {}

  ngOnInit() {
    this.isLoading = true;
    this.magazineService.getMagazine()
      .finally(() => { this.isLoading = false; })
      .subscribe((magazines: Magazine) => { this.magazines = magazines; });
  }

}
