import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AreaName } from './area-name.model';
import { AreaNamePopupService } from './area-name-popup.service';
import { AreaNameService } from './area-name.service';
import { CityDistrictTown, CityDistrictTownService } from '../city-district-town';
import { AreaType, AreaTypeService } from '../area-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-area-name-dialog',
    templateUrl: './area-name-dialog.component.html'
})
export class AreaNameDialogComponent implements OnInit {

    areaName: AreaName;
    authorities: any[];
    isSaving: boolean;

    citydistricttowns: CityDistrictTown[];

    areatypes: AreaType[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private areaNameService: AreaNameService,
        private cityDistrictTownService: CityDistrictTownService,
        private areaTypeService: AreaTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.cityDistrictTownService.query()
            .subscribe((res: ResponseWrapper) => { this.citydistricttowns = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.areaTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.areatypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.areaName.id !== undefined) {
            this.subscribeToSaveResponse(
                this.areaNameService.update(this.areaName));
        } else {
            this.subscribeToSaveResponse(
                this.areaNameService.create(this.areaName));
        }
    }

    private subscribeToSaveResponse(result: Observable<AreaName>) {
        result.subscribe((res: AreaName) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: AreaName) {
        this.eventManager.broadcast({ name: 'areaNameListModification', content: 'OK'});
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

    trackCityDistrictTownById(index: number, item: CityDistrictTown) {
        return item.id;
    }

    trackAreaTypeById(index: number, item: AreaType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-area-name-popup',
    template: ''
})
export class AreaNamePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaNamePopupService: AreaNamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.areaNamePopupService
                    .open(AreaNameDialogComponent, params['id']);
            } else {
                this.modalRef = this.areaNamePopupService
                    .open(AreaNameDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
