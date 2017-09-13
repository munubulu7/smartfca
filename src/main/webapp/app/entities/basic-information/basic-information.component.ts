import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { BasicInformation } from './basic-information.model';
import { BasicInformationService } from './basic-information.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-basic-information',
    templateUrl: './basic-information.component.html'
})
export class BasicInformationComponent implements OnInit, OnDestroy {
basicInformations: BasicInformation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private basicInformationService: BasicInformationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.basicInformationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.basicInformations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBasicInformations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BasicInformation) {
        return item.id;
    }
    registerChangeInBasicInformations() {
        this.eventSubscriber = this.eventManager.subscribe('basicInformationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
