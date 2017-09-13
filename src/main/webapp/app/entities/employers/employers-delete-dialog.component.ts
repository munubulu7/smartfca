import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Employers } from './employers.model';
import { EmployersPopupService } from './employers-popup.service';
import { EmployersService } from './employers.service';

@Component({
    selector: 'jhi-employers-delete-dialog',
    templateUrl: './employers-delete-dialog.component.html'
})
export class EmployersDeleteDialogComponent {

    employers: Employers;

    constructor(
        private employersService: EmployersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employersListModification',
                content: 'Deleted an employers'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employers-delete-popup',
    template: ''
})
export class EmployersDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employersPopupService: EmployersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.employersPopupService
                .open(EmployersDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
