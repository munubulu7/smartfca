import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ContactType } from './contact-type.model';
import { ContactTypePopupService } from './contact-type-popup.service';
import { ContactTypeService } from './contact-type.service';

@Component({
    selector: 'jhi-contact-type-dialog',
    templateUrl: './contact-type-dialog.component.html'
})
export class ContactTypeDialogComponent implements OnInit {

    contactType: ContactType;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private contactTypeService: ContactTypeService,
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
        if (this.contactType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contactTypeService.update(this.contactType));
        } else {
            this.subscribeToSaveResponse(
                this.contactTypeService.create(this.contactType));
        }
    }

    private subscribeToSaveResponse(result: Observable<ContactType>) {
        result.subscribe((res: ContactType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ContactType) {
        this.eventManager.broadcast({ name: 'contactTypeListModification', content: 'OK'});
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
    selector: 'jhi-contact-type-popup',
    template: ''
})
export class ContactTypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactTypePopupService: ContactTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.contactTypePopupService
                    .open(ContactTypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.contactTypePopupService
                    .open(ContactTypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
