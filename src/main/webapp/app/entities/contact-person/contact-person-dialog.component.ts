import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContactPerson } from './contact-person.model';
import { ContactPersonPopupService } from './contact-person-popup.service';
import { ContactPersonService } from './contact-person.service';
import { BasicInformation, BasicInformationService } from '../basic-information';
import { Designation, DesignationService } from '../designation';
import { Person, PersonService } from '../person';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-contact-person-dialog',
    templateUrl: './contact-person-dialog.component.html'
})
export class ContactPersonDialogComponent implements OnInit {

    contactPerson: ContactPerson;
    authorities: any[];
    isSaving: boolean;

    basicinformations: BasicInformation[];

    designations: Designation[];

    persons: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private contactPersonService: ContactPersonService,
        private basicInformationService: BasicInformationService,
        private designationService: DesignationService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.basicInformationService.query()
            .subscribe((res: ResponseWrapper) => { this.basicinformations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.designationService.query()
            .subscribe((res: ResponseWrapper) => { this.designations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.personService
            .query({filter: 'contactperson-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.contactPerson.persons || !this.contactPerson.persons.id) {
                    this.persons = res.json;
                } else {
                    this.personService
                        .find(this.contactPerson.persons.id)
                        .subscribe((subRes: Person) => {
                            this.persons = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contactPerson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contactPersonService.update(this.contactPerson));
        } else {
            this.subscribeToSaveResponse(
                this.contactPersonService.create(this.contactPerson));
        }
    }

    private subscribeToSaveResponse(result: Observable<ContactPerson>) {
        result.subscribe((res: ContactPerson) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ContactPerson) {
        this.eventManager.broadcast({ name: 'contactPersonListModification', content: 'OK'});
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

    trackBasicInformationById(index: number, item: BasicInformation) {
        return item.id;
    }

    trackDesignationById(index: number, item: Designation) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-contact-person-popup',
    template: ''
})
export class ContactPersonPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPersonPopupService: ContactPersonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.contactPersonPopupService
                    .open(ContactPersonDialogComponent, params['id']);
            } else {
                this.modalRef = this.contactPersonPopupService
                    .open(ContactPersonDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
