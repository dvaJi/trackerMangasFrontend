import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import Magazine from './../../models/magazine';
import { MagazineService } from './../../services/magazine.service';

@Component({
  selector: 'app-magazine-list',
  templateUrl: './magazine-list.component.html',
  styleUrls: ['./magazine-list.component.scss']
})
export class MagazineListComponent implements OnInit {

  magazines: Magazine;
  isLoading: boolean;

  constructor(private magazineService: MagazineService) {}

  ngOnInit() {
    this.isLoading = true;
    this.magazineService.getMagazines()
      .finally(() => { this.isLoading = false; })
      .subscribe((magazines: Magazine) => { this.magazines = magazines; });
  }

}
