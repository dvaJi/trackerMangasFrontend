import { Component, Input } from '@angular/core';
import { Serie } from '@app/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-serie-info',
  template: `
    <div class="Info">
        <div class="my-3 p-3 bg-white rounded box-shadow">
            <h6 class="border-bottom border-gray pb-2 mb-0" translate>Sinopsis</h6>
            <div class="media text-muted pt-3">
                <p class="media-body pb-3 mb-0 small lh-125 border-gray">
                    {{ description }}
                </p>
            </div>
        </div>
        <div class="my-3 p-3 bg-white rounded box-shadow">
            <h6 class="border-bottom border-gray pb-2 mb-0" translate>Staff</h6>
            <a [routerLink]="['/staff', staff.id_staff, staff.stub]" *ngFor="let staff of serie.staffFormated" >
                <div class="media text-muted pt-3">
                    <img [src]="staff.image_url_full" class="mr-2 rounded" style="width: 32px; height: 32px;">
                    <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                        <div class="d-flex justify-content-between align-items-center w-100">
                            <strong class="text-gray-dark">{{staff.name}}</strong>
                            <!-- <a href="#">Follow</a>-->
                        </div>
                        <span class="d-block">
                            <span *ngFor="let rol of staff.rol; let isLast=last">
                                {{rol}} {{isLast ? '' : ' & '}}
                            </span>
                        </span>
                    </div>
                </div>
            </a>
        </div>
        <div class="my-3 p-3 bg-white rounded box-shadow">
            <h6 class="border-bottom border-gray pb-2 mb-0" translate>Revistas</h6>
            <a [routerLink]="['/magazine', magazine.id, magazine.stub]"  *ngFor="let magazine of serie.magazines" >
                <div class="media text-muted pt-3">
                    <img [src]="magazineThumb(magazine.cover)" class="mr-2 rounded" style="width: 32px; height: 32px;">
                    <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                        <div class="d-flex justify-content-between align-items-center w-100">
                            <strong class="text-gray-dark">{{magazine.name}}</strong>
                            <!-- <a href="#">Follow</a>-->
                        </div>
                        <span class="d-block">{{ magazine.release_schedule }}</span>
                    </div>
                </div>
            </a>
        </div>
    </div>
  `,
  styles: [``]
})
export class SerieInfoComponent {
  @Input() serie: Serie;

  get description() {
    return this.serie !== null ? this.serie.description : '';
  }

  magazineThumb(cover: any) {
    if (cover == null) {
      return '/api/content/magazine/default.png';
    }

    return cover.thumb.path_full;
  }
}
