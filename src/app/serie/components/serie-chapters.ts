import { Component, Input } from '@angular/core';
import { Serie } from '@app/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-serie-chapters',
  template: `
    <div class="Chapters">
        <div class="my-3 p-3 bg-white rounded box-shadow">
            <h6 class="border-bottom border-gray pb-2 mb-0" translate>Capítulos</h6>
            <div class="media text-muted pt-3">
            <table *ngIf="serie.releases.length > 0" class="table table-striped">
                <tbody>
                    <tr *ngFor="let release of serie.releases">
                        <td>c.{{release.chapter}}</td>
                        <td>{{release.created | date: 'dd/MM/yyyy'}}</td>
                        <td class="text-right">
                        <span *ngFor="let scan of release.groups; let isLast=last">
                            <a [routerLink]="['/scan', scan.group_id, scan.stub]">{{scan.name}}</a>
                            {{isLast ? '' : ' & '}}
                        </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
  `,
  styles: [``]
})
export class SerieChaptersComponent {
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
