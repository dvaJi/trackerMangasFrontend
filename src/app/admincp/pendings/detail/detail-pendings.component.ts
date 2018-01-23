import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators/finalize';
import { KeysPipe } from './details.pipe';

import { Serie, Staff, Magazine, Scan, Release } from '@app/models';
import { StaffService, MagazineService, ScanService, ReleaseService, SerieService } from '@app/services';


@Component({
    selector: 'app-detail-pendings',
    templateUrl: './detail-pendings.component.html',
    styleUrls: ['./detail-pendings.component.scss']
})
export class DetailPendingsComponent implements OnInit {

    object: Object[];
    module: string;
    statusReason: string;
    isLoading = false;
    modalReference: NgbModalRef;

    constructor(
        private router: Router,
        private modalService: NgbModal,
        private serieService: SerieService,
        private staffService: StaffService,
        private magazineService: MagazineService,
        private scanService: ScanService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.isLoading = true;
        const id: number = Number(this.route.snapshot.paramMap.get('id'));
        this.module = this.route.snapshot.paramMap.get('module') || 'series';
        this.getModule(this.module, id)
            .pipe(finalize(() => { this.isLoading = false; }))
            .subscribe((data: any) => { this.object = data; });
    }

    getStatusSC(status: number): string {
        status = Number(status);
        switch (status) {
            case 1: return 'Completado';
            case 2: return 'En Curso';
            case 3: return 'Abandonado';
            default:
                console.error('El estado no es correcto.');
                return '';
        }
    }

    getStatusOC(status: number): string {
        status = Number(status);
        switch (status) {
            case 1: return 'Completado';
            case 2: return 'En Curso';
            case 3: return 'Cancelado';
            case 4: return 'Hiatus';
            default:
                console.error('El estado no es correcto.');
                return '';
        }
    }

    getGender(status: number): string {
        status = Number(status);
        switch (status) {
            case 1: return 'Másculino';
            case 2: return 'Femenino';
            default:
                console.error('El estado no es correcto.');
                return '';
        }
    }

    /**
     * Abre el modal del parámetro recibido
     * @param {*} content
     * @memberof DetailPendingsComponent
     */
    openModal(content: any) {
        this.modalReference = this.modalService.open(content);
    }

    /**
     * Método para aprobar el objeto
     * @param {*} content
     * @memberof DetailPendingsComponent
     */
    modalApprove(content: any) {
        this.setModule(this.module, this.object['id'], true, null)
            .subscribe((data: any) => {
                this.router.navigate(['/admincp/pendings'], { replaceUrl: true });
                this.modalReference.close();
            });
    }

    /**
     * Método para rechazar el objeto
     * @param {*} content
     * @memberof DetailPendingsComponent
     */
    modalDeny(content: any) {
        this.setModule(this.module, this.object['id'], false, this.statusReason)
            .subscribe((data: any) => {
                this.router.navigate(['/admincp/pendings'], { replaceUrl: true });
                this.modalReference.close();
            });
    }

    /**
     * Retorna un Observable de un objeto en específico según su id y módulo
     * @param {String} module
     * @param {number} id
     * @returns {Observable<any>}
     * @memberof DetailPendingsComponent
     */
    getModule(module: String, id: number): Observable<any> {
        switch (module) {
            case 'series':
                return this.serieService.getPendingSeries({ id: id });
            case 'staff':
                return this.staffService.getPendingStaff({ id: id });
            case 'magazine':
                return this.magazineService.getPendingMagazine({ id: id });
            case 'scans':
                return this.scanService.getPendingScan({ id: id });
            default:
                return Observable.throw(new Error('No se encontró módulo'));
        }
    }

    /**
     * Se encarga de buscar el módulo a cual pertenece y llamar al servicio
     * para actualizar el objeto pendiente.
     * @private
     * @param {String} module
     * @param {number} id
     * @param {boolean} status
     * @param {string} reason
     * @memberof DetailPendingsComponent
     * @returns {Observable<any>}
     * @author dvaJi
     */
    private setModule(module: String, id: number, status: boolean, reason: string): Observable<any> {
        switch (module) {
            case 'series':
                return this.serieService.updatePendingSeries({ id: id, status: status, reason: reason });
            case 'staff':
                return this.staffService.updatePendingStaff({ id: id, status: status, reason: reason });
            case 'magazine':
                return this.magazineService.updatePendingMagazine({ id: id, status: status, reason: reason });
            case 'scans':
                return this.scanService.updatePendingScan({ id: id, status: status, reason: reason });
            default:
                return Observable.throw(new Error('No se encontró módulo'));
        }
    }

}
