import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PremisesBuildingVillage } from './premises-building-village.model';
import { PremisesBuildingVillagePopupService } from './premises-building-village-popup.service';
import { PremisesBuildingVillageService } from './premises-building-village.service';
import { PostOffice, PostOfficeService } from '../post-office';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-premises-building-village-dialog',
    templateUrl: './premises-building-village-dialog.component.html'
})
export class PremisesBuildingVillageDialogComponent implements OnInit {

    premisesBuildingVillage: PremisesBuildingVillage;
    authorities: any[];
    isSaving: boolean;

    postoffices: PostOffice[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private premisesBuildingVillageService: PremisesBuildingVillageService,
        private postOfficeService: PostOfficeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.postOfficeService.query()
            .subscribe((res: ResponseWrapper) => { this.postoffices = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.premisesBuildingVillage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.premisesBuildingVillageService.update(this.premisesBuildingVillage));
        } else {
            this.subscribeToSaveResponse(
                this.premisesBuildingVillageService.create(this.premisesBuildingVillage));
        }
    }

    private subscribeToSaveResponse(result: Observable<PremisesBuildingVillage>) {
        result.subscribe((res: PremisesBuildingVillage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PremisesBuildingVillage) {
        this.eventManager.broadcast({ name: 'premisesBuildingVillageListModification', content: 'OK'});
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

    trackPostOfficeById(index: number, item: PostOffice) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-premises-building-village-popup',
    template: ''
})
export class PremisesBuildingVillagePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private premisesBuildingVillagePopupService: PremisesBuildingVillagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.premisesBuildingVillagePopupService
                    .open(PremisesBuildingVillageDialogComponent, params['id']);
            } else {
                this.modalRef = this.premisesBuildingVillagePopupService
                    .open(PremisesBuildingVillageDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
