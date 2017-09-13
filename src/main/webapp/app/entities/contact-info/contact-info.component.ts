import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ContactInfo } from './contact-info.model';
import { ContactInfoService } from './contact-info.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-contact-info',
    templateUrl: './contact-info.component.html'
})
export class ContactInfoComponent implements OnInit, OnDestroy {
contactInfos: ContactInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contactInfoService: ContactInfoService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contactInfoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contactInfos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContactInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ContactInfo) {
        return item.id;
    }
    registerChangeInContactInfos() {
        this.eventSubscriber = this.eventManager.subscribe('contactInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
