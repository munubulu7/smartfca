import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Employers } from './employers.model';
import { EmployersService } from './employers.service';

@Component({
    selector: 'jhi-employers-detail',
    templateUrl: './employers-detail.component.html'
})
export class EmployersDetailComponent implements OnInit, OnDestroy {

    employers: Employers;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private employersService: EmployersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmployers();
    }

    load(id) {
        this.employersService.find(id).subscribe((employers) => {
            this.employers = employers;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employersListModification',
            (response) => this.load(this.employers.id)
        );
    }
}
