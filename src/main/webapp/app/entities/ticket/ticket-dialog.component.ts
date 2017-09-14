import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ticket } from './ticket.model';
import { TicketPopupService } from './ticket-popup.service';
import { TicketService } from './ticket.service';
import { RegistrationInformation, RegistrationInformationService } from '../registration-information';
import { TicketStatus, TicketStatusService } from '../ticket-status';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ticket-dialog',
    templateUrl: './ticket-dialog.component.html'
})
export class TicketDialogComponent implements OnInit {

    ticket: Ticket;
    authorities: any[];
    isSaving: boolean;

    registrationinformations: RegistrationInformation[];

    ticketstatuses: TicketStatus[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private ticketService: TicketService,
        private registrationInformationService: RegistrationInformationService,
        private ticketStatusService: TicketStatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.registrationInformationService.query()
            .subscribe((res: ResponseWrapper) => { this.registrationinformations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.ticketStatusService.query()
            .subscribe((res: ResponseWrapper) => { this.ticketstatuses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ticket.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ticketService.update(this.ticket));
        } else {
            this.subscribeToSaveResponse(
                this.ticketService.create(this.ticket));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ticket>) {
        result.subscribe((res: Ticket) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Ticket) {
        this.eventManager.broadcast({ name: 'ticketListModification', content: 'OK'});
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

    trackRegistrationInformationById(index: number, item: RegistrationInformation) {
        return item.id;
    }

    trackTicketStatusById(index: number, item: TicketStatus) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ticket-popup',
    template: ''
})
export class TicketPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ticketPopupService: TicketPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.ticketPopupService
                    .open(TicketDialogComponent, params['id']);
            } else {
                this.modalRef = this.ticketPopupService
                    .open(TicketDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
