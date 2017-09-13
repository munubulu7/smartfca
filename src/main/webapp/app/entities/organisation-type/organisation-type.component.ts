import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { OrganisationType } from './organisation-type.model';
import { OrganisationTypeService } from './organisation-type.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-organisation-type',
    templateUrl: './organisation-type.component.html'
})
export class OrganisationTypeComponent implements OnInit, OnDestroy {
organisationTypes: OrganisationType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private organisationTypeService: OrganisationTypeService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.organisationTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.organisationTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrganisationTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrganisationType) {
        return item.id;
    }
    registerChangeInOrganisationTypes() {
        this.eventSubscriber = this.eventManager.subscribe('organisationTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
