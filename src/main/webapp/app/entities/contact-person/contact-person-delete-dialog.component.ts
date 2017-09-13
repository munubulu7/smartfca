import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContactPerson } from './contact-person.model';
import { ContactPersonPopupService } from './contact-person-popup.service';
import { ContactPersonService } from './contact-person.service';

@Component({
    selector: 'jhi-contact-person-delete-dialog',
    templateUrl: './contact-person-delete-dialog.component.html'
})
export class ContactPersonDeleteDialogComponent {

    contactPerson: ContactPerson;

    constructor(
        private contactPersonService: ContactPersonService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactPersonService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contactPersonListModification',
                content: 'Deleted an contactPerson'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-person-delete-popup',
    template: ''
})
export class ContactPersonDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPersonPopupService: ContactPersonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.contactPersonPopupService
                .open(ContactPersonDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
