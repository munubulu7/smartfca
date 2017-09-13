import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PremisesBuildingVillage } from './premises-building-village.model';
import { PremisesBuildingVillagePopupService } from './premises-building-village-popup.service';
import { PremisesBuildingVillageService } from './premises-building-village.service';

@Component({
    selector: 'jhi-premises-building-village-delete-dialog',
    templateUrl: './premises-building-village-delete-dialog.component.html'
})
export class PremisesBuildingVillageDeleteDialogComponent {

    premisesBuildingVillage: PremisesBuildingVillage;

    constructor(
        private premisesBuildingVillageService: PremisesBuildingVillageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.premisesBuildingVillageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'premisesBuildingVillageListModification',
                content: 'Deleted an premisesBuildingVillage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-premises-building-village-delete-popup',
    template: ''
})
export class PremisesBuildingVillageDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private premisesBuildingVillagePopupService: PremisesBuildingVillagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.premisesBuildingVillagePopupService
                .open(PremisesBuildingVillageDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
