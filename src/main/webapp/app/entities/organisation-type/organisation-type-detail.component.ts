import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { OrganisationType } from './organisation-type.model';
import { OrganisationTypeService } from './organisation-type.service';

@Component({
    selector: 'jhi-organisation-type-detail',
    templateUrl: './organisation-type-detail.component.html'
})
export class OrganisationTypeDetailComponent implements OnInit, OnDestroy {

    organisationType: OrganisationType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private organisationTypeService: OrganisationTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrganisationTypes();
    }

    load(id) {
        this.organisationTypeService.find(id).subscribe((organisationType) => {
            this.organisationType = organisationType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrganisationTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'organisationTypeListModification',
            (response) => this.load(this.organisationType.id)
        );
    }
}
