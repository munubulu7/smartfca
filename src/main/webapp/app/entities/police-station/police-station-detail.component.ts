import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { PoliceStation } from './police-station.model';
import { PoliceStationService } from './police-station.service';

@Component({
    selector: 'jhi-police-station-detail',
    templateUrl: './police-station-detail.component.html'
})
export class PoliceStationDetailComponent implements OnInit, OnDestroy {

    policeStation: PoliceStation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private policeStationService: PoliceStationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPoliceStations();
    }

    load(id) {
        this.policeStationService.find(id).subscribe((policeStation) => {
            this.policeStation = policeStation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPoliceStations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'policeStationListModification',
            (response) => this.load(this.policeStation.id)
        );
    }
}
