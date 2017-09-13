import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { PostOffice } from './post-office.model';
import { PostOfficeService } from './post-office.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-post-office',
    templateUrl: './post-office.component.html'
})
export class PostOfficeComponent implements OnInit, OnDestroy {
postOffices: PostOffice[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private postOfficeService: PostOfficeService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.postOfficeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.postOffices = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPostOffices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PostOffice) {
        return item.id;
    }
    registerChangeInPostOffices() {
        this.eventSubscriber = this.eventManager.subscribe('postOfficeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
