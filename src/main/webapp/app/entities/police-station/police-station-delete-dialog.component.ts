import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PoliceStation } from './police-station.model';
import { PoliceStationPopupService } from './police-station-popup.service';
import { PoliceStationService } from './police-station.service';

@Component({
    selector: 'jhi-police-station-delete-dialog',
    templateUrl: './police-station-delete-dialog.component.html'
})
export class PoliceStationDeleteDialogComponent {

    policeStation: PoliceStation;

    constructor(
        private policeStationService: PoliceStationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.policeStationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'policeStationListModification',
                content: 'Deleted an policeStation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-police-station-delete-popup',
    template: ''
})
export class PoliceStationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private policeStationPopupService: PoliceStationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.policeStationPopupService
                .open(PoliceStationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
