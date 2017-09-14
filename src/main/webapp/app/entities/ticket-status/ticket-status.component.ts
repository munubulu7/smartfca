import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { TicketStatus } from './ticket-status.model';
import { TicketStatusService } from './ticket-status.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-ticket-status',
    templateUrl: './ticket-status.component.html'
})
export class TicketStatusComponent implements OnInit, OnDestroy {
ticketStatuses: TicketStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ticketStatusService: TicketStatusService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ticketStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ticketStatuses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTicketStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TicketStatus) {
        return item.id;
    }
    registerChangeInTicketStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('ticketStatusListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
