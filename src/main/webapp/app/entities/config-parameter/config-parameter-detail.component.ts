import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ConfigParameter } from './config-parameter.model';
import { ConfigParameterService } from './config-parameter.service';

@Component({
    selector: 'jhi-config-parameter-detail',
    templateUrl: './config-parameter-detail.component.html'
})
export class ConfigParameterDetailComponent implements OnInit, OnDestroy {

    configParameter: ConfigParameter;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private configParameterService: ConfigParameterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConfigParameters();
    }

    load(id) {
        this.configParameterService.find(id).subscribe((configParameter) => {
            this.configParameter = configParameter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConfigParameters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'configParameterListModification',
            (response) => this.load(this.configParameter.id)
        );
    }
}
