import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Pincode } from './pincode.model';
import { PincodeService } from './pincode.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-pincode',
    templateUrl: './pincode.component.html'
})
export class PincodeComponent implements OnInit, OnDestroy {
pincodes: Pincode[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pincodeService: PincodeService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pincodeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pincodes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPincodes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Pincode) {
        return item.id;
    }
    registerChangeInPincodes() {
        this.eventSubscriber = this.eventManager.subscribe('pincodeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
