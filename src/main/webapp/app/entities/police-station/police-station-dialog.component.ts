import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PoliceStation } from './police-station.model';
import { PoliceStationPopupService } from './police-station-popup.service';
import { PoliceStationService } from './police-station.service';
import { AreaName, AreaNameService } from '../area-name';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-police-station-dialog',
    templateUrl: './police-station-dialog.component.html'
})
export class PoliceStationDialogComponent implements OnInit {

    policeStation: PoliceStation;
    authorities: any[];
    isSaving: boolean;

    areanames: AreaName[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private policeStationService: PoliceStationService,
        private areaNameService: AreaNameService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.areaNameService.query()
            .subscribe((res: ResponseWrapper) => { this.areanames = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.policeStation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.policeStationService.update(this.policeStation));
        } else {
            this.subscribeToSaveResponse(
                this.policeStationService.create(this.policeStation));
        }
    }

    private subscribeToSaveResponse(result: Observable<PoliceStation>) {
        result.subscribe((res: PoliceStation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PoliceStation) {
        this.eventManager.broadcast({ name: 'policeStationListModification', content: 'OK'});
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

    trackAreaNameById(index: number, item: AreaName) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-police-station-popup',
    template: ''
})
export class PoliceStationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private policeStationPopupService: PoliceStationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.policeStationPopupService
                    .open(PoliceStationDialogComponent, params['id']);
            } else {
                this.modalRef = this.policeStationPopupService
                    .open(PoliceStationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
