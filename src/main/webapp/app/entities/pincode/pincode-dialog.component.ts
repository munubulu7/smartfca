import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pincode } from './pincode.model';
import { PincodePopupService } from './pincode-popup.service';
import { PincodeService } from './pincode.service';
import { PremisesBuildingVillage, PremisesBuildingVillageService } from '../premises-building-village';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pincode-dialog',
    templateUrl: './pincode-dialog.component.html'
})
export class PincodeDialogComponent implements OnInit {

    pincode: Pincode;
    authorities: any[];
    isSaving: boolean;

    premisesbuildingvillages: PremisesBuildingVillage[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private pincodeService: PincodeService,
        private premisesBuildingVillageService: PremisesBuildingVillageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.premisesBuildingVillageService.query()
            .subscribe((res: ResponseWrapper) => { this.premisesbuildingvillages = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pincode.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pincodeService.update(this.pincode));
        } else {
            this.subscribeToSaveResponse(
                this.pincodeService.create(this.pincode));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pincode>) {
        result.subscribe((res: Pincode) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Pincode) {
        this.eventManager.broadcast({ name: 'pincodeListModification', content: 'OK'});
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

    trackPremisesBuildingVillageById(index: number, item: PremisesBuildingVillage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pincode-popup',
    template: ''
})
export class PincodePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pincodePopupService: PincodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.pincodePopupService
                    .open(PincodeDialogComponent, params['id']);
            } else {
                this.modalRef = this.pincodePopupService
                    .open(PincodeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
