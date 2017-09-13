import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Occupation } from './occupation.model';
import { OccupationService } from './occupation.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-occupation',
    templateUrl: './occupation.component.html'
})
export class OccupationComponent implements OnInit, OnDestroy {
occupations: Occupation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private occupationService: OccupationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.occupationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.occupations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOccupations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Occupation) {
        return item.id;
    }
    registerChangeInOccupations() {
        this.eventSubscriber = this.eventManager.subscribe('occupationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
