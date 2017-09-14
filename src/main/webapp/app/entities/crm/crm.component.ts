import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {RegistrationInformation} from '../registration-information/registration-information.model';
import {RegistrationInformationService} from '../registration-information/registration-information.service';
import {Principal, ResponseWrapper} from '../../shared';
import {CenterLocationService} from "../center-location/center-location.service";
import {CenterLocation} from "../center-location/center-location.model";

@Component({
    selector: 'jhi-registration-information',
    templateUrl: './crm.component.html'
})
export class CrmComponent implements OnInit, OnDestroy {
    registrationInformations: RegistrationInformation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private registrationInformationService: RegistrationInformationService,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private centerLocationService: CenterLocationService,
                private principal: Principal) {
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
