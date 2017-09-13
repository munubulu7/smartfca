import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AreaName } from './area-name.model';
import { AreaNamePopupService } from './area-name-popup.service';
import { AreaNameService } from './area-name.service';

@Component({
    selector: 'jhi-area-name-delete-dialog',
    templateUrl: './area-name-delete-dialog.component.html'
})
export class AreaNameDeleteDialogComponent {

    areaName: AreaName;

    constructor(
        private areaNameService: AreaNameService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.areaNameService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'areaNameListModification',
                content: 'Deleted an areaName'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-area-name-delete-popup',
    template: ''
})
export class AreaNameDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaNamePopupService: AreaNamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.areaNamePopupService
                .open(AreaNameDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
