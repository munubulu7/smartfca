import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrganisationType } from './organisation-type.model';
import { OrganisationTypePopupService } from './organisation-type-popup.service';
import { OrganisationTypeService } from './organisation-type.service';

@Component({
    selector: 'jhi-organisation-type-dialog',
    templateUrl: './organisation-type-dialog.component.html'
})
export class OrganisationTypeDialogComponent implements OnInit {

    organisationType: OrganisationType;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private organisationTypeService: OrganisationTypeService,
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
        if (this.organisationType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organisationTypeService.update(this.organisationType));
        } else {
            this.subscribeToSaveResponse(
                this.organisationTypeService.create(this.organisationType));
        }
    }

    private subscribeToSaveResponse(result: Observable<OrganisationType>) {
        result.subscribe((res: OrganisationType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: OrganisationType) {
        this.eventManager.broadcast({ name: 'organisationTypeListModification', content: 'OK'});
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
    selector: 'jhi-organisation-type-popup',
    template: ''
})
export class OrganisationTypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationTypePopupService: OrganisationTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.organisationTypePopupService
                    .open(OrganisationTypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.organisationTypePopupService
                    .open(OrganisationTypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
