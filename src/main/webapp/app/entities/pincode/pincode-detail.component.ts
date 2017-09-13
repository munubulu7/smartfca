import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Pincode } from './pincode.model';
import { PincodeService } from './pincode.service';

@Component({
    selector: 'jhi-pincode-detail',
    templateUrl: './pincode-detail.component.html'
})
export class PincodeDetailComponent implements OnInit, OnDestroy {

    pincode: Pincode;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pincodeService: PincodeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPincodes();
    }

    load(id) {
        this.pincodeService.find(id).subscribe((pincode) => {
            this.pincode = pincode;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPincodes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pincodeListModification',
            (response) => this.load(this.pincode.id)
        );
    }
}
