import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressInformation } from './address-information.model';
import { AddressInformationPopupService } from './address-information-popup.service';
import { AddressInformationService } from './address-information.service';
import { RegistrationInformation, RegistrationInformationService } from '../registration-information';
import { AddressType, AddressTypeService } from '../address-type';
import { AddressFor, AddressForService } from '../address-for';
import { Pincode, PincodeService } from '../pincode';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-address-information-dialog',
    templateUrl: './address-information-dialog.component.html'
})
export class AddressInformationDialogComponent implements OnInit {

    addressInformation: AddressInformation;
    authorities: any[];
    isSaving: boolean;

    registrationinformations: RegistrationInformation[];

    addresstypes: AddressType[];

    addressfors: AddressFor[];

    pincodes: Pincode[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private addressInformationService: AddressInformationService,
        private registrationInformationService: RegistrationInformationService,
        private addressTypeService: AddressTypeService,
        private addressForService: AddressForService,
        private pincodeService: PincodeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.registrationInformationService.query()
            .subscribe((res: ResponseWrapper) => { this.registrationinformations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.addressTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.addresstypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.addressForService.query()
            .subscribe((res: ResponseWrapper) => { this.addressfors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pincodeService.query()
            .subscribe((res: ResponseWrapper) => { this.pincodes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.addressInformation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressInformationService.update(this.addressInformation));
        } else {
            this.subscribeToSaveResponse(
                this.addressInformationService.create(this.addressInformation));
        }
    }

    private subscribeToSaveResponse(result: Observable<AddressInformation>) {
        result.subscribe((res: AddressInformation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: AddressInformation) {
        this.eventManager.broadcast({ name: 'addressInformationListModification', content: 'OK'});
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

    trackAddressTypeById(index: number, item: AddressType) {
        return item.id;
    }

    trackAddressForById(index: number, item: AddressFor) {
        return item.id;
    }

    trackPincodeById(index: number, item: Pincode) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-address-information-popup',
    template: ''
})
export class AddressInformationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressInformationPopupService: AddressInformationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.addressInformationPopupService
                    .open(AddressInformationDialogComponent, params['id']);
            } else {
                this.modalRef = this.addressInformationPopupService
                    .open(AddressInformationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
