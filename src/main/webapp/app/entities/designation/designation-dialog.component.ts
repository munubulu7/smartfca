import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Designation } from './designation.model';
import { DesignationPopupService } from './designation-popup.service';
import { DesignationService } from './designation.service';

@Component({
    selector: 'jhi-designation-dialog',
    templateUrl: './designation-dialog.component.html'
})
export class DesignationDialogComponent implements OnInit {

    designation: Designation;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private designationService: DesignationService,
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
        if (this.designation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.designationService.update(this.designation));
        } else {
            this.subscribeToSaveResponse(
                this.designationService.create(this.designation));
        }
    }

    private subscribeToSaveResponse(result: Observable<Designation>) {
        result.subscribe((res: Designation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Designation) {
        this.eventManager.broadcast({ name: 'designationListModification', content: 'OK'});
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
    selector: 'jhi-designation-popup',
    template: ''
})
export class DesignationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private designationPopupService: DesignationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.designationPopupService
                    .open(DesignationDialogComponent, params['id']);
            } else {
                this.modalRef = this.designationPopupService
                    .open(DesignationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
