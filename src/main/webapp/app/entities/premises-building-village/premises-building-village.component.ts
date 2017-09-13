import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { PremisesBuildingVillage } from './premises-building-village.model';
import { PremisesBuildingVillageService } from './premises-building-village.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-premises-building-village',
    templateUrl: './premises-building-village.component.html'
})
export class PremisesBuildingVillageComponent implements OnInit, OnDestroy {
premisesBuildingVillages: PremisesBuildingVillage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private premisesBuildingVillageService: PremisesBuildingVillageService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.premisesBuildingVillageService.query().subscribe(
            (res: ResponseWrapper) => {
                this.premisesBuildingVillages = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPremisesBuildingVillages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PremisesBuildingVillage) {
        return item.id;
    }
    registerChangeInPremisesBuildingVillages() {
        this.eventSubscriber = this.eventManager.subscribe('premisesBuildingVillageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
