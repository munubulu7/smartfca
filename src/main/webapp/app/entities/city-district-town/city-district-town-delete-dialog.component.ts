import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CityDistrictTown } from './city-district-town.model';
import { CityDistrictTownPopupService } from './city-district-town-popup.service';
import { CityDistrictTownService } from './city-district-town.service';

@Component({
    selector: 'jhi-city-district-town-delete-dialog',
    templateUrl: './city-district-town-delete-dialog.component.html'
})
export class CityDistrictTownDeleteDialogComponent {

    cityDistrictTown: CityDistrictTown;

    constructor(
        private cityDistrictTownService: CityDistrictTownService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cityDistrictTownService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cityDistrictTownListModification',
                content: 'Deleted an cityDistrictTown'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-city-district-town-delete-popup',
    template: ''
})
export class CityDistrictTownDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityDistrictTownPopupService: CityDistrictTownPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.cityDistrictTownPopupService
                .open(CityDistrictTownDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
