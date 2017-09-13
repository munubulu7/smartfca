import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Salutation } from './salutation.model';
import { SalutationService } from './salutation.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-salutation',
    templateUrl: './salutation.component.html'
})
export class SalutationComponent implements OnInit, OnDestroy {
salutations: Salutation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private salutationService: SalutationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.salutationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.salutations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSalutations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Salutation) {
        return item.id;
    }
    registerChangeInSalutations() {
        this.eventSubscriber = this.eventManager.subscribe('salutationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
