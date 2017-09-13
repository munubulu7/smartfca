import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CenterLocation } from './center-location.model';
import { CenterLocationPopupService } from './center-location-popup.service';
import { CenterLocationService } from './center-location.service';

@Component({
    selector: 'jhi-center-location-delete-dialog',
    templateUrl: './center-location-delete-dialog.component.html'
})
export class CenterLocationDeleteDialogComponent {

    centerLocation: CenterLocation;

    constructor(
        private centerLocationService: CenterLocationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.centerLocationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'centerLocationListModification',
                content: 'Deleted an centerLocation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-center-location-delete-popup',
    template: ''
})
export class CenterLocationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private centerLocationPopupService: CenterLocationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.centerLocationPopupService
                .open(CenterLocationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
