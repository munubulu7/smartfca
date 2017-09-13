import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { AddressFor } from './address-for.model';
import { AddressForService } from './address-for.service';

@Component({
    selector: 'jhi-address-for-detail',
    templateUrl: './address-for-detail.component.html'
})
export class AddressForDetailComponent implements OnInit, OnDestroy {

    addressFor: AddressFor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private addressForService: AddressForService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAddressFors();
    }

    load(id) {
        this.addressForService.find(id).subscribe((addressFor) => {
            this.addressFor = addressFor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAddressFors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'addressForListModification',
            (response) => this.load(this.addressFor.id)
        );
    }
}
