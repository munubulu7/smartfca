import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TicketStatus } from './ticket-status.model';
import { TicketStatusPopupService } from './ticket-status-popup.service';
import { TicketStatusService } from './ticket-status.service';

@Component({
    selector: 'jhi-ticket-status-dialog',
    templateUrl: './ticket-status-dialog.component.html'
})
export class TicketStatusDialogComponent implements OnInit {

    ticketStatus: TicketStatus;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private ticketStatusService: TicketStatusService,
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
        if (this.ticketStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ticketStatusService.update(this.ticketStatus));
        } else {
            this.subscribeToSaveResponse(
                this.ticketStatusService.create(this.ticketStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<TicketStatus>) {
        result.subscribe((res: TicketStatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: TicketStatus) {
        this.eventManager.broadcast({ name: 'ticketStatusListModification', content: 'OK'});
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
    selector: 'jhi-ticket-status-popup',
    template: ''
})
export class TicketStatusPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ticketStatusPopupService: TicketStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.ticketStatusPopupService
                    .open(TicketStatusDialogComponent, params['id']);
            } else {
                this.modalRef = this.ticketStatusPopupService
                    .open(TicketStatusDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
