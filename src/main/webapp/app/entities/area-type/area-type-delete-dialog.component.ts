import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AreaType } from './area-type.model';
import { AreaTypePopupService } from './area-type-popup.service';
import { AreaTypeService } from './area-type.service';

@Component({
    selector: 'jhi-area-type-delete-dialog',
    templateUrl: './area-type-delete-dialog.component.html'
})
export class AreaTypeDeleteDialogComponent {

    areaType: AreaType;

    constructor(
        private areaTypeService: AreaTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.areaTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'areaTypeListModification',
                content: 'Deleted an areaType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-area-type-delete-popup',
    template: ''
})
export class AreaTypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaTypePopupService: AreaTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.areaTypePopupService
                .open(AreaTypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
