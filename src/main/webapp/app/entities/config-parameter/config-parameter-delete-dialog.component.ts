import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ConfigParameter } from './config-parameter.model';
import { ConfigParameterPopupService } from './config-parameter-popup.service';
import { ConfigParameterService } from './config-parameter.service';

@Component({
    selector: 'jhi-config-parameter-delete-dialog',
    templateUrl: './config-parameter-delete-dialog.component.html'
})
export class ConfigParameterDeleteDialogComponent {

    configParameter: ConfigParameter;

    constructor(
        private configParameterService: ConfigParameterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.configParameterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'configParameterListModification',
                content: 'Deleted an configParameter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-config-parameter-delete-popup',
    template: ''
})
export class ConfigParameterDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private configParameterPopupService: ConfigParameterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.configParameterPopupService
                .open(ConfigParameterDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
