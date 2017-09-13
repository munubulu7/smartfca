import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Occupation } from './occupation.model';
import { OccupationService } from './occupation.service';

@Component({
    selector: 'jhi-occupation-detail',
    templateUrl: './occupation-detail.component.html'
})
export class OccupationDetailComponent implements OnInit, OnDestroy {

    occupation: Occupation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private occupationService: OccupationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOccupations();
    }

    load(id) {
        this.occupationService.find(id).subscribe((occupation) => {
            this.occupation = occupation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOccupations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'occupationListModification',
            (response) => this.load(this.occupation.id)
        );
    }
}
