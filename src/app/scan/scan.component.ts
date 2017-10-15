import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { Scan } from '../shared/model/scan';
import { ScanService } from './scan.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

  scans: Scan;
  isLoading: boolean;

  constructor(private scanService: ScanService) {}

  ngOnInit() {
    this.isLoading = true;
    this.scanService.getScans()
      .finally(() => { this.isLoading = false; })
      .subscribe((scans: Scan) => { this.scans = scans; });
  }

}
