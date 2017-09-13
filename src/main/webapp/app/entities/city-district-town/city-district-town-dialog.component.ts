import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CityDistrictTown } from './city-district-town.model';
import { CityDistrictTownPopupService } from './city-district-town-popup.service';
import { CityDistrictTownService } from './city-district-town.service';
import { State, StateService } from '../state';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-city-district-town-dialog',
    templateUrl: './city-district-town-dialog.component.html'
})
export class CityDistrictTownDialogComponent implements OnInit {

    cityDistrictTown: CityDistrictTown;
    authorities: any[];
    isSaving: boolean;

    states: State[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private cityDistrictTownService: CityDistrictTownService,
        private stateService: StateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.stateService.query()
            .subscribe((res: ResponseWrapper) => { this.states = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cityDistrictTown.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cityDistrictTownService.update(this.cityDistrictTown));
        } else {
            this.subscribeToSaveResponse(
                this.cityDistrictTownService.create(this.cityDistrictTown));
        }
    }

    private subscribeToSaveResponse(result: Observable<CityDistrictTown>) {
        result.subscribe((res: CityDistrictTown) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: CityDistrictTown) {
        this.eventManager.broadcast({ name: 'cityDistrictTownListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackStateById(index: number, item: State) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-city-district-town-popup',
    template: ''
})
export class CityDistrictTownPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityDistrictTownPopupService: CityDistrictTownPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.cityDistrictTownPopupService
                    .open(CityDistrictTownDialogComponent, params['id']);
            } else {
                this.modalRef = this.cityDistrictTownPopupService
                    .open(CityDistrictTownDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
