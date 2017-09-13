import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sector } from './sector.model';
import { SectorPopupService } from './sector-popup.service';
import { SectorService } from './sector.service';

@Component({
    selector: 'jhi-sector-dialog',
    templateUrl: './sector-dialog.component.html'
})
export class SectorDialogComponent implements OnInit {

    sector: Sector;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private sectorService: SectorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sector.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sectorService.update(this.sector));
        } else {
            this.subscribeToSaveResponse(
                this.sectorService.create(this.sector));
        }
    }

    private subscribeToSaveResponse(result: Observable<Sector>) {
        result.subscribe((res: Sector) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Sector) {
        this.eventManager.broadcast({ name: 'sectorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-sector-popup',
    template: ''
})
export class SectorPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sectorPopupService: SectorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.sectorPopupService
                    .open(SectorDialogComponent, params['id']);
            } else {
                this.modalRef = this.sectorPopupService
                    .open(SectorDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
