import { finalize } from 'rxjs/operators/finalize';
import { Component, OnInit } from '@angular/core';

import { Magazine } from '@app/models';
import { MagazineService } from '@app/services';

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
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((magazines: Magazine) => { this.magazines = magazines; });
  }

}
