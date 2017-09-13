import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResidentialStatus } from './residential-status.model';
import { ResidentialStatusPopupService } from './residential-status-popup.service';
import { ResidentialStatusService } from './residential-status.service';

@Component({
    selector: 'jhi-residential-status-dialog',
    templateUrl: './residential-status-dialog.component.html'
})
export class ResidentialStatusDialogComponent implements OnInit {

    residentialStatus: ResidentialStatus;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private residentialStatusService: ResidentialStatusService,
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
        if (this.residentialStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.residentialStatusService.update(this.residentialStatus));
        } else {
            this.subscribeToSaveResponse(
                this.residentialStatusService.create(this.residentialStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResidentialStatus>) {
        result.subscribe((res: ResidentialStatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResidentialStatus) {
        this.eventManager.broadcast({ name: 'residentialStatusListModification', content: 'OK'});
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
    selector: 'jhi-residential-status-popup',
    template: ''
})
export class ResidentialStatusPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private residentialStatusPopupService: ResidentialStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.residentialStatusPopupService
                    .open(ResidentialStatusDialogComponent, params['id']);
            } else {
                this.modalRef = this.residentialStatusPopupService
                    .open(ResidentialStatusDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
