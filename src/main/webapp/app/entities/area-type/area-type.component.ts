import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { AreaType } from './area-type.model';
import { AreaTypeService } from './area-type.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-area-type',
    templateUrl: './area-type.component.html'
})
export class AreaTypeComponent implements OnInit, OnDestroy {
areaTypes: AreaType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private areaTypeService: AreaTypeService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.areaTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.areaTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAreaTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AreaType) {
        return item.id;
    }
    registerChangeInAreaTypes() {
        this.eventSubscriber = this.eventManager.subscribe('areaTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
