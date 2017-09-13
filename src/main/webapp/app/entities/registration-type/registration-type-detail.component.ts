import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { RegistrationType } from './registration-type.model';
import { RegistrationTypeService } from './registration-type.service';

@Component({
    selector: 'jhi-registration-type-detail',
    templateUrl: './registration-type-detail.component.html'
})
export class RegistrationTypeDetailComponent implements OnInit, OnDestroy {

    registrationType: RegistrationType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private registrationTypeService: RegistrationTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegistrationTypes();
    }

    load(id) {
        this.registrationTypeService.find(id).subscribe((registrationType) => {
            this.registrationType = registrationType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegistrationTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'registrationTypeListModification',
            (response) => this.load(this.registrationType.id)
        );
    }
}
