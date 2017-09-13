import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Employers } from './employers.model';
import { EmployersPopupService } from './employers-popup.service';
import { EmployersService } from './employers.service';
import { Occupation, OccupationService } from '../occupation';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-employers-dialog',
    templateUrl: './employers-dialog.component.html'
})
export class EmployersDialogComponent implements OnInit {

    employers: Employers;
    authorities: any[];
    isSaving: boolean;

    occupations: Occupation[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private employersService: EmployersService,
        private occupationService: OccupationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.occupationService.query()
            .subscribe((res: ResponseWrapper) => { this.occupations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.employers.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employersService.update(this.employers));
        } else {
            this.subscribeToSaveResponse(
                this.employersService.create(this.employers));
        }
    }

    private subscribeToSaveResponse(result: Observable<Employers>) {
        result.subscribe((res: Employers) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Employers) {
        this.eventManager.broadcast({ name: 'employersListModification', content: 'OK'});
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

    trackOccupationById(index: number, item: Occupation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-employers-popup',
    template: ''
})
export class EmployersPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employersPopupService: EmployersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.employersPopupService
                    .open(EmployersDialogComponent, params['id']);
            } else {
                this.modalRef = this.employersPopupService
                    .open(EmployersDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
