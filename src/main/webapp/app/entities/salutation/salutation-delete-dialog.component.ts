import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Salutation } from './salutation.model';
import { SalutationPopupService } from './salutation-popup.service';
import { SalutationService } from './salutation.service';

@Component({
    selector: 'jhi-salutation-delete-dialog',
    templateUrl: './salutation-delete-dialog.component.html'
})
export class SalutationDeleteDialogComponent {

    salutation: Salutation;

    constructor(
        private salutationService: SalutationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salutationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'salutationListModification',
                content: 'Deleted an salutation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-salutation-delete-popup',
    template: ''
})
export class SalutationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salutationPopupService: SalutationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.salutationPopupService
                .open(SalutationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
