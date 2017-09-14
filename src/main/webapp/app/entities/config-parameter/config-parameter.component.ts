import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ConfigParameter } from './config-parameter.model';
import { ConfigParameterService } from './config-parameter.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-config-parameter',
    templateUrl: './config-parameter.component.html'
})
export class ConfigParameterComponent implements OnInit, OnDestroy {
configParameters: ConfigParameter[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private configParameterService: ConfigParameterService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.configParameterService.query().subscribe(
            (res: ResponseWrapper) => {
                this.configParameters = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInConfigParameters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ConfigParameter) {
        return item.id;
    }
    registerChangeInConfigParameters() {
        this.eventSubscriber = this.eventManager.subscribe('configParameterListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
