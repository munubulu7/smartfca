import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RegistrationType } from './registration-type.model';
import { RegistrationTypePopupService } from './registration-type-popup.service';
import { RegistrationTypeService } from './registration-type.service';

@Component({
    selector: 'jhi-registration-type-dialog',
    templateUrl: './registration-type-dialog.component.html'
})
export class RegistrationTypeDialogComponent implements OnInit {

    registrationType: RegistrationType;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private registrationTypeService: RegistrationTypeService,
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
        if (this.registrationType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.registrationTypeService.update(this.registrationType));
        } else {
            this.subscribeToSaveResponse(
                this.registrationTypeService.create(this.registrationType));
        }
    }

    private subscribeToSaveResponse(result: Observable<RegistrationType>) {
        result.subscribe((res: RegistrationType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: RegistrationType) {
        this.eventManager.broadcast({ name: 'registrationTypeListModification', content: 'OK'});
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
    selector: 'jhi-registration-type-popup',
    template: ''
})
export class RegistrationTypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationTypePopupService: RegistrationTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.registrationTypePopupService
                    .open(RegistrationTypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.registrationTypePopupService
                    .open(RegistrationTypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
