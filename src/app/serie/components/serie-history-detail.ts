import { Component, Input } from '@angular/core';
import { Serie, SerieChangelog } from '@app/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-serie-history-detail',
  template: `
    <div class="timeline-icon text-white" [ngClass]="iconColorClass">
        <i class="fa fa-user" aria-hidden="true"></i>
    </div>
    <div class="mt-1 p-3 bg-white rounded box-shadow timeline-content">
        <h6 class="border-bottom border-gray pb-2 mt-1 mb-0">@{{ username }}</h6>
        <div *ngFor="let detail of changelog.details">
          <h6 class="text-muted pt-1">{{ detail.public_name_column }}</h6>
          <div class="media text-muted pt-1">
            <div class="media-body pb-3 mb-0 small lh-125 mr-1">
              <strong class="d-block text-gray-dark">Antes</strong>
              <div class="change-before">{{ detail.old_value }}</div>
            </div>
            <div class="media-body pb-3 mb-0 small lh-125 ml-1">
              <strong class="d-block text-gray-dark">Después</strong>
              <div class="change-after">{{ detail.new_value }}</div>
            </div>
          </div>
        </div>
    </div>
  `,
  styles: [
    `
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
    .timeline .timeline-card:after,
    .timeline .timeline-card:before,
    .timeline .timeline-heading:after,
    .timeline .timeline-heading:before {
        content: " ";
        display: table;
    }
    .timeline .timeline-card:after,
    .timeline .timeline-card:before,
    .timeline .timeline-heading:after,
    .timeline .timeline-heading:before {
        content: " ";
        display: table;
    }
    .timeline .timeline-card:after,
    .timeline .timeline-content:after,
    .timeline .timeline-heading:after {
        clear: both;
    }
    .change-before {
      background-color: #ffeef0;
      padding: 2px 4px;
    }
    .change-after {
      background-color: #e6ffed;
      padding: 2px 4px;
    }
  `
  ]
})
export class SerieHistoryDetailComponent {
  @Input() changelog: SerieChangelog;

  get username() {
    return this.changelog !== null ? this.changelog.user.username : '';
  }

  get iconColorClass() {
    return this.getIconColorClass();
  }

  getIconColorClass() {
    const valor = Number((Math.random() * (8 - 1) + 1).toFixed());
    switch (valor) {
      case 1:
        return 'bg-primary';
      case 2:
        return 'bg-secondary';
      case 3:
        return 'bg-success';
      case 4:
        return 'bg-danger';
      case 5:
        return 'bg-warning';
      case 6:
        return 'bg-info';
      case 7:
        return 'bg-dark';
      case 8:
        return 'bg-white text-black';
      default:
        return 'bg-primary';
    }
  }
}
