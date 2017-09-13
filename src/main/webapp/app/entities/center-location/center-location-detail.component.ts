import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { CenterLocation } from './center-location.model';
import { CenterLocationService } from './center-location.service';

@Component({
    selector: 'jhi-center-location-detail',
    templateUrl: './center-location-detail.component.html'
})
export class CenterLocationDetailComponent implements OnInit, OnDestroy {

    centerLocation: CenterLocation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private centerLocationService: CenterLocationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCenterLocations();
    }

    load(id) {
        this.centerLocationService.find(id).subscribe((centerLocation) => {
            this.centerLocation = centerLocation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCenterLocations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'centerLocationListModification',
            (response) => this.load(this.centerLocation.id)
        );
    }
}
