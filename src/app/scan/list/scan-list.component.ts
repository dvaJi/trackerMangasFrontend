import { finalize } from 'rxjs/operators/finalize';

import { Component, OnInit } from '@angular/core';

import Scan from './../../models/scan';
import { ScanService } from './../../services/scan.service';

@Component({
  selector: 'app-scan-list',
  templateUrl: './scan-list.component.html',
  styleUrls: ['./scan-list.component.scss']
})
export class ScanListComponent implements OnInit {

  scans: Scan;
  isLoading: boolean;

  constructor(private scanService: ScanService) { }

  ngOnInit() {
    this.isLoading = true;
    this.scanService.getScans()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((scans: Scan) => { this.scans = scans; });
  }

}
