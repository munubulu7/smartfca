import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { PremisesBuildingVillage } from './premises-building-village.model';
import { PremisesBuildingVillageService } from './premises-building-village.service';

@Component({
    selector: 'jhi-premises-building-village-detail',
    templateUrl: './premises-building-village-detail.component.html'
})
export class PremisesBuildingVillageDetailComponent implements OnInit, OnDestroy {

    premisesBuildingVillage: PremisesBuildingVillage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private premisesBuildingVillageService: PremisesBuildingVillageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPremisesBuildingVillages();
    }

    load(id) {
        this.premisesBuildingVillageService.find(id).subscribe((premisesBuildingVillage) => {
            this.premisesBuildingVillage = premisesBuildingVillage;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPremisesBuildingVillages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'premisesBuildingVillageListModification',
            (response) => this.load(this.premisesBuildingVillage.id)
        );
    }
}
