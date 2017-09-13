import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { AreaName } from './area-name.model';
import { AreaNameService } from './area-name.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-area-name',
    templateUrl: './area-name.component.html'
})
export class AreaNameComponent implements OnInit, OnDestroy {
areaNames: AreaName[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private areaNameService: AreaNameService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.areaNameService.query().subscribe(
            (res: ResponseWrapper) => {
                this.areaNames = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAreaNames();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AreaName) {
        return item.id;
    }
    registerChangeInAreaNames() {
        this.eventSubscriber = this.eventManager.subscribe('areaNameListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
