import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegistrationType } from './registration-type.model';
import { RegistrationTypePopupService } from './registration-type-popup.service';
import { RegistrationTypeService } from './registration-type.service';

@Component({
    selector: 'jhi-registration-type-delete-dialog',
    templateUrl: './registration-type-delete-dialog.component.html'
})
export class RegistrationTypeDeleteDialogComponent {

    registrationType: RegistrationType;

    constructor(
        private registrationTypeService: RegistrationTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.registrationTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'registrationTypeListModification',
                content: 'Deleted an registrationType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registration-type-delete-popup',
    template: ''
})
export class RegistrationTypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationTypePopupService: RegistrationTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.registrationTypePopupService
                .open(RegistrationTypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
