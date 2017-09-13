import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { CenterLocation } from './center-location.model';
import { CenterLocationService } from './center-location.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-center-location',
    templateUrl: './center-location.component.html'
})
export class CenterLocationComponent implements OnInit, OnDestroy {
centerLocations: CenterLocation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private centerLocationService: CenterLocationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.centerLocationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.centerLocations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCenterLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CenterLocation) {
        return item.id;
    }
    registerChangeInCenterLocations() {
        this.eventSubscriber = this.eventManager.subscribe('centerLocationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
