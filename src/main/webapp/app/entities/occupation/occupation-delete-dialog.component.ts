import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Occupation } from './occupation.model';
import { OccupationPopupService } from './occupation-popup.service';
import { OccupationService } from './occupation.service';

@Component({
    selector: 'jhi-occupation-delete-dialog',
    templateUrl: './occupation-delete-dialog.component.html'
})
export class OccupationDeleteDialogComponent {

    occupation: Occupation;

    constructor(
        private occupationService: OccupationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.occupationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'occupationListModification',
                content: 'Deleted an occupation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-occupation-delete-popup',
    template: ''
})
export class OccupationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private occupationPopupService: OccupationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.occupationPopupService
                .open(OccupationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
