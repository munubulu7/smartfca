import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { PoliceStation } from './police-station.model';
import { PoliceStationService } from './police-station.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-police-station',
    templateUrl: './police-station.component.html'
})
export class PoliceStationComponent implements OnInit, OnDestroy {
policeStations: PoliceStation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private policeStationService: PoliceStationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.policeStationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.policeStations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPoliceStations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PoliceStation) {
        return item.id;
    }
    registerChangeInPoliceStations() {
        this.eventSubscriber = this.eventManager.subscribe('policeStationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
