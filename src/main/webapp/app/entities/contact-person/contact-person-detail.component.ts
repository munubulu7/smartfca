import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ContactPerson } from './contact-person.model';
import { ContactPersonService } from './contact-person.service';

@Component({
    selector: 'jhi-contact-person-detail',
    templateUrl: './contact-person-detail.component.html'
})
export class ContactPersonDetailComponent implements OnInit, OnDestroy {

    contactPerson: ContactPerson;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contactPersonService: ContactPersonService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContactPeople();
    }

    load(id) {
        this.contactPersonService.find(id).subscribe((contactPerson) => {
            this.contactPerson = contactPerson;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContactPeople() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contactPersonListModification',
            (response) => this.load(this.contactPerson.id)
        );
    }
}
