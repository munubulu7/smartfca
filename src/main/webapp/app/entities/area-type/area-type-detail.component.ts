import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { AreaType } from './area-type.model';
import { AreaTypeService } from './area-type.service';

@Component({
    selector: 'jhi-area-type-detail',
    templateUrl: './area-type-detail.component.html'
})
export class AreaTypeDetailComponent implements OnInit, OnDestroy {

    areaType: AreaType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private areaTypeService: AreaTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAreaTypes();
    }

    load(id) {
        this.areaTypeService.find(id).subscribe((areaType) => {
            this.areaType = areaType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAreaTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'areaTypeListModification',
            (response) => this.load(this.areaType.id)
        );
    }
}
