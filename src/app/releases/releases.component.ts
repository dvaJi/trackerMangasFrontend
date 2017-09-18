import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Release } from './release';

import { ReleaseService } from './release.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  releases: Release;
  isLoading: boolean;

  constructor(private releaseService: ReleaseService) {}

  ngOnInit() {
    this.isLoading = true;
    this.releaseService.getReleases()
      .finally(() => { this.isLoading = false; })
      .subscribe((releases: Release) => { this.releases = releases; });
  }

}
