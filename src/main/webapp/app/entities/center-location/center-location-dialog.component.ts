import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CenterLocation } from './center-location.model';
import { CenterLocationPopupService } from './center-location-popup.service';
import { CenterLocationService } from './center-location.service';

@Component({
    selector: 'jhi-center-location-dialog',
    templateUrl: './center-location-dialog.component.html'
})
export class CenterLocationDialogComponent implements OnInit {

    centerLocation: CenterLocation;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private centerLocationService: CenterLocationService,
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
        if (this.centerLocation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.centerLocationService.update(this.centerLocation));
        } else {
            this.subscribeToSaveResponse(
                this.centerLocationService.create(this.centerLocation));
        }
    }

    private subscribeToSaveResponse(result: Observable<CenterLocation>) {
        result.subscribe((res: CenterLocation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: CenterLocation) {
        this.eventManager.broadcast({ name: 'centerLocationListModification', content: 'OK'});
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
    selector: 'jhi-center-location-popup',
    template: ''
})
export class CenterLocationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private centerLocationPopupService: CenterLocationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.centerLocationPopupService
                    .open(CenterLocationDialogComponent, params['id']);
            } else {
                this.modalRef = this.centerLocationPopupService
                    .open(CenterLocationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
