import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { RegistrationType } from './registration-type.model';
import { RegistrationTypeService } from './registration-type.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-registration-type',
    templateUrl: './registration-type.component.html'
})
export class RegistrationTypeComponent implements OnInit, OnDestroy {
registrationTypes: RegistrationType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private registrationTypeService: RegistrationTypeService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.registrationTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.registrationTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRegistrationTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RegistrationType) {
        return item.id;
    }
    registerChangeInRegistrationTypes() {
        this.eventSubscriber = this.eventManager.subscribe('registrationTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
