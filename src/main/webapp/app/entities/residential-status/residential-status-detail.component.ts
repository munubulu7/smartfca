import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResidentialStatus } from './residential-status.model';
import { ResidentialStatusService } from './residential-status.service';

@Component({
    selector: 'jhi-residential-status-detail',
    templateUrl: './residential-status-detail.component.html'
})
export class ResidentialStatusDetailComponent implements OnInit, OnDestroy {

    residentialStatus: ResidentialStatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private residentialStatusService: ResidentialStatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResidentialStatuses();
    }

    load(id) {
        this.residentialStatusService.find(id).subscribe((residentialStatus) => {
            this.residentialStatus = residentialStatus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResidentialStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'residentialStatusListModification',
            (response) => this.load(this.residentialStatus.id)
        );
    }
}
