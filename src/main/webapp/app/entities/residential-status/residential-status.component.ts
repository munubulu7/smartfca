import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ResidentialStatus } from './residential-status.model';
import { ResidentialStatusService } from './residential-status.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-residential-status',
    templateUrl: './residential-status.component.html'
})
export class ResidentialStatusComponent implements OnInit, OnDestroy {
residentialStatuses: ResidentialStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private residentialStatusService: ResidentialStatusService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.residentialStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.residentialStatuses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResidentialStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResidentialStatus) {
        return item.id;
    }
    registerChangeInResidentialStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('residentialStatusListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
