import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AreaType } from './area-type.model';
import { AreaTypePopupService } from './area-type-popup.service';
import { AreaTypeService } from './area-type.service';

@Component({
    selector: 'jhi-area-type-dialog',
    templateUrl: './area-type-dialog.component.html'
})
export class AreaTypeDialogComponent implements OnInit {

    areaType: AreaType;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private areaTypeService: AreaTypeService,
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
        if (this.areaType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.areaTypeService.update(this.areaType));
        } else {
            this.subscribeToSaveResponse(
                this.areaTypeService.create(this.areaType));
        }
    }

    private subscribeToSaveResponse(result: Observable<AreaType>) {
        result.subscribe((res: AreaType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: AreaType) {
        this.eventManager.broadcast({ name: 'areaTypeListModification', content: 'OK'});
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
    selector: 'jhi-area-type-popup',
    template: ''
})
export class AreaTypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaTypePopupService: AreaTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.areaTypePopupService
                    .open(AreaTypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.areaTypePopupService
                    .open(AreaTypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
