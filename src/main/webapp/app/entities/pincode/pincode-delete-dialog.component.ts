import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pincode } from './pincode.model';
import { PincodePopupService } from './pincode-popup.service';
import { PincodeService } from './pincode.service';

@Component({
    selector: 'jhi-pincode-delete-dialog',
    templateUrl: './pincode-delete-dialog.component.html'
})
export class PincodeDeleteDialogComponent {

    pincode: Pincode;

    constructor(
        private pincodeService: PincodeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pincodeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pincodeListModification',
                content: 'Deleted an pincode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pincode-delete-popup',
    template: ''
})
export class PincodeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pincodePopupService: PincodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.pincodePopupService
                .open(PincodeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
