import { finalize } from 'rxjs/operators/finalize';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Scan } from '@app/models';
import { ScanService } from '@app/services';

@Component({
  selector: 'app-scan-detail',
  templateUrl: './scan-detail.component.html',
  styleUrls: ['./scan-detail.component.scss']
})
export class ScanDetailComponent implements OnInit {

  scan: Scan;
  isLoading: boolean;

  constructor(private scanService: ScanService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.scanService.getScan({ id: id })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((scan: Scan) => { this.scan = scan; });
  }

}
