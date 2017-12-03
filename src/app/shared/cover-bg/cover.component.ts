import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import Serie from '../../models/serie';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {

  @Input() serie: Serie = null;

  constructor(config: NgbRatingConfig) {
    config.max = 10;
    config.readonly = true;
  }

  ngOnInit() { }

  badgeColor(type: string): string {
    switch (type) {
      case 'Manga': return 'badge-info';
      case 'Manhwa': return 'badge-warning';
      default: return 'badge-secondary';
    }
  }

}
