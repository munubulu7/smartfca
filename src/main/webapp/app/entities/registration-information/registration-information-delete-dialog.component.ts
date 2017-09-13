import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegistrationInformation } from './registration-information.model';
import { RegistrationInformationPopupService } from './registration-information-popup.service';
import { RegistrationInformationService } from './registration-information.service';

@Component({
    selector: 'jhi-registration-information-delete-dialog',
    templateUrl: './registration-information-delete-dialog.component.html'
})
export class RegistrationInformationDeleteDialogComponent {

    registrationInformation: RegistrationInformation;

    constructor(
        private registrationInformationService: RegistrationInformationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.registrationInformationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'registrationInformationListModification',
                content: 'Deleted an registrationInformation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registration-information-delete-popup',
    template: ''
})
export class RegistrationInformationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationInformationPopupService: RegistrationInformationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.registrationInformationPopupService
                .open(RegistrationInformationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
