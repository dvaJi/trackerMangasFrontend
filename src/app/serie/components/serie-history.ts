import { Component, Input } from '@angular/core';
import { Serie, SerieChangelog } from '@app/models';
import { SerieHistoryDetailComponent } from './serie-history-detail';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-serie-history',
  template: `
    <div class="History">
        <div class="timeline">
            <app-serie-history-detail
                class="timeline-card"
                *ngFor="let changelog of changelogs"
                [changelog]="changelog">
            </app-serie-history-detail>
            <div class="timeline-card">
                <div class="timeline-icon bg-primary text-white">
                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [
    `
    .timeline {
        position: relative;
        margin-bottom: 3.25rem;
    }
    .timeline::before {
        position: absolute;
        top: 6px;
        left: 15px;
        width: 2px;
        height: 100%;
        background: #e2e2e2;
        content: '';
    }
    .timeline-card {
        position: relative;
        margin: 1.875rem 0;
    }

    .timeline-card:first-child {
        margin-top: 0;
    }

    .timeline-icon {
        position: absolute;
        top: 6px;
        left: 0;
        text-align: center;
        font-size: 0.9rem;
        line-height: 28px;
        width: 1.875rem;
        height: 1.875rem;
        border-radius: 50%;
        box-shadow: 0 0 0 2px #fff;
    }
    .timeline-content {
        position: relative;
        margin-left: 60px;
        padding: 1.25rem;
        border: .0625rem solid #e2e2e2;
        background: #fff;
        border-radius: 0;
    }
  `
  ]
})
export class SerieHistoryComponent {
  @Input() changelogs: SerieChangelog[];
}
