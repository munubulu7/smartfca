import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { CityDistrictTown } from './city-district-town.model';
import { CityDistrictTownService } from './city-district-town.service';

@Component({
    selector: 'jhi-city-district-town-detail',
    templateUrl: './city-district-town-detail.component.html'
})
export class CityDistrictTownDetailComponent implements OnInit, OnDestroy {

    cityDistrictTown: CityDistrictTown;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cityDistrictTownService: CityDistrictTownService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCityDistrictTowns();
    }

    load(id) {
        this.cityDistrictTownService.find(id).subscribe((cityDistrictTown) => {
            this.cityDistrictTown = cityDistrictTown;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCityDistrictTowns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cityDistrictTownListModification',
            (response) => this.load(this.cityDistrictTown.id)
        );
    }
}
