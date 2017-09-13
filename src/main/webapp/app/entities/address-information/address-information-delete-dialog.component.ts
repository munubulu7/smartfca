import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressInformation } from './address-information.model';
import { AddressInformationPopupService } from './address-information-popup.service';
import { AddressInformationService } from './address-information.service';

@Component({
    selector: 'jhi-address-information-delete-dialog',
    templateUrl: './address-information-delete-dialog.component.html'
})
export class AddressInformationDeleteDialogComponent {

    addressInformation: AddressInformation;

    constructor(
        private addressInformationService: AddressInformationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressInformationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressInformationListModification',
                content: 'Deleted an addressInformation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-information-delete-popup',
    template: ''
})
export class AddressInformationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressInformationPopupService: AddressInformationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.addressInformationPopupService
                .open(AddressInformationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
