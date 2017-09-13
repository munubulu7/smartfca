import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationType } from './organisation-type.model';
import { OrganisationTypePopupService } from './organisation-type-popup.service';
import { OrganisationTypeService } from './organisation-type.service';

@Component({
    selector: 'jhi-organisation-type-delete-dialog',
    templateUrl: './organisation-type-delete-dialog.component.html'
})
export class OrganisationTypeDeleteDialogComponent {

    organisationType: OrganisationType;

    constructor(
        private organisationTypeService: OrganisationTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organisationTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'organisationTypeListModification',
                content: 'Deleted an organisationType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organisation-type-delete-popup',
    template: ''
})
export class OrganisationTypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationTypePopupService: OrganisationTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.organisationTypePopupService
                .open(OrganisationTypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
