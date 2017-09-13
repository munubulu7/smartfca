import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { AddressInformation } from './address-information.model';
import { AddressInformationService } from './address-information.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-address-information',
    templateUrl: './address-information.component.html'
})
export class AddressInformationComponent implements OnInit, OnDestroy {
addressInformations: AddressInformation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private addressInformationService: AddressInformationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.addressInformationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.addressInformations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAddressInformations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AddressInformation) {
        return item.id;
    }
    registerChangeInAddressInformations() {
        this.eventSubscriber = this.eventManager.subscribe('addressInformationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
