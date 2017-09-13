import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RegistrationInformation } from './registration-information.model';
import { RegistrationInformationPopupService } from './registration-information-popup.service';
import { RegistrationInformationService } from './registration-information.service';
import { CenterLocation, CenterLocationService } from '../center-location';
import { RegistrationType, RegistrationTypeService } from '../registration-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-registration-information-dialog',
    templateUrl: './registration-information-dialog.component.html'
})
export class RegistrationInformationDialogComponent implements OnInit {

    registrationInformation: RegistrationInformation;
    authorities: any[];
    isSaving: boolean;

    centerlocations: CenterLocation[];

    registrationtypes: RegistrationType[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private registrationInformationService: RegistrationInformationService,
        private centerLocationService: CenterLocationService,
        private registrationTypeService: RegistrationTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.centerLocationService.query()
            .subscribe((res: ResponseWrapper) => { this.centerlocations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.registrationTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.registrationtypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.registrationInformation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.registrationInformationService.update(this.registrationInformation));
        } else {
            this.subscribeToSaveResponse(
                this.registrationInformationService.create(this.registrationInformation));
        }
    }

    private subscribeToSaveResponse(result: Observable<RegistrationInformation>) {
        result.subscribe((res: RegistrationInformation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: RegistrationInformation) {
        this.eventManager.broadcast({ name: 'registrationInformationListModification', content: 'OK'});
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

    trackCenterLocationById(index: number, item: CenterLocation) {
        return item.id;
    }

    trackRegistrationTypeById(index: number, item: RegistrationType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-registration-information-popup',
    template: ''
})
export class RegistrationInformationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationInformationPopupService: RegistrationInformationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.registrationInformationPopupService
                    .open(RegistrationInformationDialogComponent, params['id']);
            } else {
                this.modalRef = this.registrationInformationPopupService
                    .open(RegistrationInformationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
