import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {AddressInformation} from '../address-information/address-information.model';
import {AddressInformationService} from '../address-information/address-information.service';
import {Principal, ResponseWrapper} from '../../shared';
import {CrmService} from "./crm.service";

@Component({
    selector: 'jhi-address-information',
    templateUrl: './crm-address.component.html'
})
export class CrmAddressComponent implements OnInit, OnDestroy {
    addressInformations: AddressInformation[];
    currentAccount: any;
    private eventSubscriber: Subscription;
    private subscription: Subscription;
    regId: number;

    constructor(private addressInformationService: AddressInformationService,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private principal: Principal,
                private crmService: CrmService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.loadAll();

        this.registerChangeInAddressInformations();
    }

    private loadAll() {
        this.subscription = this.route.params.subscribe((params) => {
            this.regId = params['regId'];
            this.crmService.getAddresseesByRegistration(params['regId']).subscribe(
                (res: ResponseWrapper) => {
                    this.addressInformations = res.json;
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AddressInformation) {
        return item.id;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    registerChangeInAddressInformations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'addressInformationListModification',
            (response) => this.loadAll()
        );
    }
}
