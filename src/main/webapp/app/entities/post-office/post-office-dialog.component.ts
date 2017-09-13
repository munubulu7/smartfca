import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PostOffice } from './post-office.model';
import { PostOfficePopupService } from './post-office-popup.service';
import { PostOfficeService } from './post-office.service';
import { PoliceStation, PoliceStationService } from '../police-station';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-post-office-dialog',
    templateUrl: './post-office-dialog.component.html'
})
export class PostOfficeDialogComponent implements OnInit {

    postOffice: PostOffice;
    authorities: any[];
    isSaving: boolean;

    policestations: PoliceStation[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private postOfficeService: PostOfficeService,
        private policeStationService: PoliceStationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.policeStationService.query()
            .subscribe((res: ResponseWrapper) => { this.policestations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.postOffice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.postOfficeService.update(this.postOffice));
        } else {
            this.subscribeToSaveResponse(
                this.postOfficeService.create(this.postOffice));
        }
    }

    private subscribeToSaveResponse(result: Observable<PostOffice>) {
        result.subscribe((res: PostOffice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PostOffice) {
        this.eventManager.broadcast({ name: 'postOfficeListModification', content: 'OK'});
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

    trackPoliceStationById(index: number, item: PoliceStation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-post-office-popup',
    template: ''
})
export class PostOfficePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postOfficePopupService: PostOfficePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.postOfficePopupService
                    .open(PostOfficeDialogComponent, params['id']);
            } else {
                this.modalRef = this.postOfficePopupService
                    .open(PostOfficeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
