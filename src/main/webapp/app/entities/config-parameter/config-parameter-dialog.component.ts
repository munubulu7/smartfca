import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConfigParameter } from './config-parameter.model';
import { ConfigParameterPopupService } from './config-parameter-popup.service';
import { ConfigParameterService } from './config-parameter.service';

@Component({
    selector: 'jhi-config-parameter-dialog',
    templateUrl: './config-parameter-dialog.component.html'
})
export class ConfigParameterDialogComponent implements OnInit {

    configParameter: ConfigParameter;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private configParameterService: ConfigParameterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.configParameter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.configParameterService.update(this.configParameter));
        } else {
            this.subscribeToSaveResponse(
                this.configParameterService.create(this.configParameter));
        }
    }

    private subscribeToSaveResponse(result: Observable<ConfigParameter>) {
        result.subscribe((res: ConfigParameter) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ConfigParameter) {
        this.eventManager.broadcast({ name: 'configParameterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-config-parameter-popup',
    template: ''
})
export class ConfigParameterPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private configParameterPopupService: ConfigParameterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.configParameterPopupService
                    .open(ConfigParameterDialogComponent, params['id']);
            } else {
                this.modalRef = this.configParameterPopupService
                    .open(ConfigParameterDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
