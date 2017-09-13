import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { RegistrationInformation } from './registration-information.model';
import { RegistrationInformationService } from './registration-information.service';

@Component({
    selector: 'jhi-registration-information-detail',
    templateUrl: './registration-information-detail.component.html'
})
export class RegistrationInformationDetailComponent implements OnInit, OnDestroy {

    registrationInformation: RegistrationInformation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private registrationInformationService: RegistrationInformationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegistrationInformations();
    }

    load(id) {
        this.registrationInformationService.find(id).subscribe((registrationInformation) => {
            this.registrationInformation = registrationInformation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegistrationInformations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'registrationInformationListModification',
            (response) => this.load(this.registrationInformation.id)
        );
    }
}
