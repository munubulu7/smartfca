import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { AddressInformation } from './address-information.model';
import { AddressInformationService } from './address-information.service';

@Component({
    selector: 'jhi-address-information-detail',
    templateUrl: './address-information-detail.component.html'
})
export class AddressInformationDetailComponent implements OnInit, OnDestroy {

    addressInformation: AddressInformation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private addressInformationService: AddressInformationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAddressInformations();
    }

    load(id) {
        this.addressInformationService.find(id).subscribe((addressInformation) => {
            this.addressInformation = addressInformation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAddressInformations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'addressInformationListModification',
            (response) => this.load(this.addressInformation.id)
        );
    }
}
