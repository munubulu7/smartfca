import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContactType } from './contact-type.model';
import { ContactTypePopupService } from './contact-type-popup.service';
import { ContactTypeService } from './contact-type.service';

@Component({
    selector: 'jhi-contact-type-delete-dialog',
    templateUrl: './contact-type-delete-dialog.component.html'
})
export class ContactTypeDeleteDialogComponent {

    contactType: ContactType;

    constructor(
        private contactTypeService: ContactTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contactTypeListModification',
                content: 'Deleted an contactType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-type-delete-popup',
    template: ''
})
export class ContactTypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactTypePopupService: ContactTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.contactTypePopupService
                .open(ContactTypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
