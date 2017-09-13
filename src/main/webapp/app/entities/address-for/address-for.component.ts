import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { AddressFor } from './address-for.model';
import { AddressForService } from './address-for.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-address-for',
    templateUrl: './address-for.component.html'
})
export class AddressForComponent implements OnInit, OnDestroy {
addressFors: AddressFor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private addressForService: AddressForService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.addressForService.query().subscribe(
            (res: ResponseWrapper) => {
                this.addressFors = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAddressFors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AddressFor) {
        return item.id;
    }
    registerChangeInAddressFors() {
        this.eventSubscriber = this.eventManager.subscribe('addressForListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
