import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResidentialStatus } from './residential-status.model';
import { ResidentialStatusPopupService } from './residential-status-popup.service';
import { ResidentialStatusService } from './residential-status.service';

@Component({
    selector: 'jhi-residential-status-delete-dialog',
    templateUrl: './residential-status-delete-dialog.component.html'
})
export class ResidentialStatusDeleteDialogComponent {

    residentialStatus: ResidentialStatus;

    constructor(
        private residentialStatusService: ResidentialStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.residentialStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'residentialStatusListModification',
                content: 'Deleted an residentialStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-residential-status-delete-popup',
    template: ''
})
export class ResidentialStatusDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private residentialStatusPopupService: ResidentialStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.residentialStatusPopupService
                .open(ResidentialStatusDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
