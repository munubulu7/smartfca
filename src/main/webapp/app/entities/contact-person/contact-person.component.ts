import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ContactPerson } from './contact-person.model';
import { ContactPersonService } from './contact-person.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-contact-person',
    templateUrl: './contact-person.component.html'
})
export class ContactPersonComponent implements OnInit, OnDestroy {
contactPeople: ContactPerson[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contactPersonService: ContactPersonService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contactPersonService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contactPeople = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContactPeople();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ContactPerson) {
        return item.id;
    }
    registerChangeInContactPeople() {
        this.eventSubscriber = this.eventManager.subscribe('contactPersonListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
