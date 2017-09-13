import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { RegistrationInformation } from './registration-information.model';
import { RegistrationInformationService } from './registration-information.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-registration-information',
    templateUrl: './registration-information.component.html'
})
export class RegistrationInformationComponent implements OnInit, OnDestroy {
registrationInformations: RegistrationInformation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private registrationInformationService: RegistrationInformationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.registrationInformationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.registrationInformations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRegistrationInformations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RegistrationInformation) {
        return item.id;
    }
    registerChangeInRegistrationInformations() {
        this.eventSubscriber = this.eventManager.subscribe('registrationInformationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
