import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Salutation } from './salutation.model';
import { SalutationService } from './salutation.service';

@Component({
    selector: 'jhi-salutation-detail',
    templateUrl: './salutation-detail.component.html'
})
export class SalutationDetailComponent implements OnInit, OnDestroy {

    salutation: Salutation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private salutationService: SalutationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSalutations();
    }

    load(id) {
        this.salutationService.find(id).subscribe((salutation) => {
            this.salutation = salutation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSalutations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'salutationListModification',
            (response) => this.load(this.salutation.id)
        );
    }
}
