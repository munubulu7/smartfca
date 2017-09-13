import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Salutation } from './salutation.model';
import { SalutationPopupService } from './salutation-popup.service';
import { SalutationService } from './salutation.service';

@Component({
    selector: 'jhi-salutation-dialog',
    templateUrl: './salutation-dialog.component.html'
})
export class SalutationDialogComponent implements OnInit {

    salutation: Salutation;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private salutationService: SalutationService,
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
        if (this.salutation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salutationService.update(this.salutation));
        } else {
            this.subscribeToSaveResponse(
                this.salutationService.create(this.salutation));
        }
    }

    private subscribeToSaveResponse(result: Observable<Salutation>) {
        result.subscribe((res: Salutation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Salutation) {
        this.eventManager.broadcast({ name: 'salutationListModification', content: 'OK'});
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
    selector: 'jhi-salutation-popup',
    template: ''
})
export class SalutationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salutationPopupService: SalutationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.salutationPopupService
                    .open(SalutationDialogComponent, params['id']);
            } else {
                this.modalRef = this.salutationPopupService
                    .open(SalutationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
