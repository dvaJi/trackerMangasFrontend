import { finalize } from 'rxjs/operators/finalize';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Magazine } from '@app/models';
import { MagazineService } from '@app/services';

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
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((magazine: Magazine) => { this.magazine = magazine; });
  }

}
