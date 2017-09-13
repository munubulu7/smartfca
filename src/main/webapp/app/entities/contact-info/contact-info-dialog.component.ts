import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContactInfo } from './contact-info.model';
import { ContactInfoPopupService } from './contact-info-popup.service';
import { ContactInfoService } from './contact-info.service';
import { RegistrationInformation, RegistrationInformationService } from '../registration-information';
import { ContactType, ContactTypeService } from '../contact-type';
import { ContactPerson, ContactPersonService } from '../contact-person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-contact-info-dialog',
    templateUrl: './contact-info-dialog.component.html'
})
export class ContactInfoDialogComponent implements OnInit {

    contactInfo: ContactInfo;
    authorities: any[];
    isSaving: boolean;

    registrationinformations: RegistrationInformation[];

    contacttypes: ContactType[];

    contactpeople: ContactPerson[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private contactInfoService: ContactInfoService,
        private registrationInformationService: RegistrationInformationService,
        private contactTypeService: ContactTypeService,
        private contactPersonService: ContactPersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.registrationInformationService.query()
            .subscribe((res: ResponseWrapper) => { this.registrationinformations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.contactTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.contacttypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.contactPersonService.query()
            .subscribe((res: ResponseWrapper) => { this.contactpeople = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contactInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contactInfoService.update(this.contactInfo));
        } else {
            this.subscribeToSaveResponse(
                this.contactInfoService.create(this.contactInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<ContactInfo>) {
        result.subscribe((res: ContactInfo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ContactInfo) {
        this.eventManager.broadcast({ name: 'contactInfoListModification', content: 'OK'});
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

    trackRegistrationInformationById(index: number, item: RegistrationInformation) {
        return item.id;
    }

    trackContactTypeById(index: number, item: ContactType) {
        return item.id;
    }

    trackContactPersonById(index: number, item: ContactPerson) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-contact-info-popup',
    template: ''
})
export class ContactInfoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactInfoPopupService: ContactInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.contactInfoPopupService
                    .open(ContactInfoDialogComponent, params['id']);
            } else {
                this.modalRef = this.contactInfoPopupService
                    .open(ContactInfoDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
