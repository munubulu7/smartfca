import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressFor } from './address-for.model';
import { AddressForPopupService } from './address-for-popup.service';
import { AddressForService } from './address-for.service';

@Component({
    selector: 'jhi-address-for-delete-dialog',
    templateUrl: './address-for-delete-dialog.component.html'
})
export class AddressForDeleteDialogComponent {

    addressFor: AddressFor;

    constructor(
        private addressForService: AddressForService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressForService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressForListModification',
                content: 'Deleted an addressFor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-for-delete-popup',
    template: ''
})
export class AddressForDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressForPopupService: AddressForPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.addressForPopupService
                .open(AddressForDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
