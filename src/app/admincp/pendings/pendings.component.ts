import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Serie, Staff, Magazine, Scan, Release } from '@app/models';
import { StaffService, MagazineService, ScanService, ReleaseService, SerieService } from '@app/services';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.scss']
})
export class PendingsComponent implements OnInit {

  series: Serie[];
  staffs: Staff[];
  magazines: Magazine[];
  scans: Scan[];
  releases: Release[];
  statusReason: string;
  modalReference: NgbModalRef;
  idReleaseReference: number;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private serieService: SerieService,
    private staffService: StaffService,
    private magazineService: MagazineService,
    private releaseService: ReleaseService,
    private scanService: ScanService) { }

  ngOnInit() {
    this.serieService.getPendingSeries({})
      .subscribe((series: Serie[]) => {
        this.series = series;
      });
    this.staffService.getPendingStaff({})
      .subscribe((staffs: Staff[]) => {
        this.staffs = staffs;
      });
    this.magazineService.getPendingMagazine({})
      .subscribe((magazines: Magazine[]) => {
        this.magazines = magazines;
      });
    this.scanService.getPendingScan({})
      .subscribe((scans: Scan[]) => {
        this.scans = scans;
      });
    this.releaseService.getPendingReleases({})
      .subscribe((releases: Release[]) => {
        this.releases = releases;
      });
  }

  /**
   * Abre el modal del parámetro recibido
   * @param {*} content
   * @memberof DetailPendingsComponent
   */
  openModal(content: any, id: number) {
    this.modalReference = this.modalService.open(content);
    this.idReleaseReference = id;
  }

  updateRelease(content: any, action: string) {
    switch (action) {
      case 'APPROVE':
        this.releaseService.updatePendingReleases({ id: this.idReleaseReference, status: true, reason: '' })
          .subscribe((data: any) => {
            this.router.navigate(['/admincp/pendings'], { replaceUrl: true });
            this.modalReference.close();
          });
        break;
      case 'DENY':
        const rel = { id: this.idReleaseReference, status: false, reason: this.statusReason };
        this.releaseService.updatePendingReleases(rel)
          .subscribe((data: any) => {
            this.router.navigate(['/admincp/pendings'], { replaceUrl: true });
            this.modalReference.close();
          });
        break;
      default:
        console.log('Acción no encontrada.');
        break;
    }
  }

}
