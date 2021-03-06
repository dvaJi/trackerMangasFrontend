import { finalize } from 'rxjs/operators/finalize';

import { Component, OnInit } from '@angular/core';
import { Release } from '@app/models';
import { ReleaseService } from '@app/services';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  releases: Release;
  isLoading: boolean;

  constructor(private releaseService: ReleaseService) { }

  ngOnInit() {
    this.isLoading = true;
    this.releaseService.getReleases()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((releases: Release) => { this.releases = releases; });
  }

}
