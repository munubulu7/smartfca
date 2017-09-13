import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressFor } from './address-for.model';
import { AddressForPopupService } from './address-for-popup.service';
import { AddressForService } from './address-for.service';

@Component({
    selector: 'jhi-address-for-dialog',
    templateUrl: './address-for-dialog.component.html'
})
export class AddressForDialogComponent implements OnInit {

    addressFor: AddressFor;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private addressForService: AddressForService,
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
        if (this.addressFor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressForService.update(this.addressFor));
        } else {
            this.subscribeToSaveResponse(
                this.addressForService.create(this.addressFor));
        }
    }

    private subscribeToSaveResponse(result: Observable<AddressFor>) {
        result.subscribe((res: AddressFor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: AddressFor) {
        this.eventManager.broadcast({ name: 'addressForListModification', content: 'OK'});
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
    selector: 'jhi-address-for-popup',
    template: ''
})
export class AddressForPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressForPopupService: AddressForPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.addressForPopupService
                    .open(AddressForDialogComponent, params['id']);
            } else {
                this.modalRef = this.addressForPopupService
                    .open(AddressForDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
