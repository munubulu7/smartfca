import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { AreaName } from './area-name.model';
import { AreaNameService } from './area-name.service';

@Component({
    selector: 'jhi-area-name-detail',
    templateUrl: './area-name-detail.component.html'
})
export class AreaNameDetailComponent implements OnInit, OnDestroy {

    areaName: AreaName;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private areaNameService: AreaNameService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAreaNames();
    }

    load(id) {
        this.areaNameService.find(id).subscribe((areaName) => {
            this.areaName = areaName;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAreaNames() {
        this.eventSubscriber = this.eventManager.subscribe(
            'areaNameListModification',
            (response) => this.load(this.areaName.id)
        );
    }
}
