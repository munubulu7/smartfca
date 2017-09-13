import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { CityDistrictTown } from './city-district-town.model';
import { CityDistrictTownService } from './city-district-town.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-city-district-town',
    templateUrl: './city-district-town.component.html'
})
export class CityDistrictTownComponent implements OnInit, OnDestroy {
cityDistrictTowns: CityDistrictTown[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cityDistrictTownService: CityDistrictTownService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cityDistrictTownService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cityDistrictTowns = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCityDistrictTowns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CityDistrictTown) {
        return item.id;
    }
    registerChangeInCityDistrictTowns() {
        this.eventSubscriber = this.eventManager.subscribe('cityDistrictTownListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
