import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ContactType } from './contact-type.model';
import { ContactTypeService } from './contact-type.service';

@Component({
    selector: 'jhi-contact-type-detail',
    templateUrl: './contact-type-detail.component.html'
})
export class ContactTypeDetailComponent implements OnInit, OnDestroy {

    contactType: ContactType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contactTypeService: ContactTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContactTypes();
    }

    load(id) {
        this.contactTypeService.find(id).subscribe((contactType) => {
            this.contactType = contactType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContactTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contactTypeListModification',
            (response) => this.load(this.contactType.id)
        );
    }
}
