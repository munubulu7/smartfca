import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BasicInformation } from './basic-information.model';
import { BasicInformationPopupService } from './basic-information-popup.service';
import { BasicInformationService } from './basic-information.service';
import { RegistrationInformation, RegistrationInformationService } from '../registration-information';
import { Person, PersonService } from '../person';
import { ResidentialStatus, ResidentialStatusService } from '../residential-status';
import { MaritalStatus, MaritalStatusService } from '../marital-status';
import { Gender, GenderService } from '../gender';
import { Occupation, OccupationService } from '../occupation';
import { Employers, EmployersService } from '../employers';
import { OrganisationType, OrganisationTypeService } from '../organisation-type';
import { Sector, SectorService } from '../sector';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-basic-information-dialog',
    templateUrl: './basic-information-dialog.component.html'
})
export class BasicInformationDialogComponent implements OnInit {

    basicInformation: BasicInformation;
    authorities: any[];
    isSaving: boolean;

    registrationinformations: RegistrationInformation[];

    names: Person[];

    fathers: Person[];

    mothers: Person[];

    residentialstatuses: ResidentialStatus[];

    maritalstatuses: MaritalStatus[];

    genders: Gender[];

    occupations: Occupation[];

    employers: Employers[];

    organisationtypes: OrganisationType[];

    sectors: Sector[];
    dateOfBirthDp: any;
    yearOfEmployedDp: any;
    establishmentDp: any;
    commencementDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private basicInformationService: BasicInformationService,
        private registrationInformationService: RegistrationInformationService,
        private personService: PersonService,
        private residentialStatusService: ResidentialStatusService,
        private maritalStatusService: MaritalStatusService,
        private genderService: GenderService,
        private occupationService: OccupationService,
        private employersService: EmployersService,
        private organisationTypeService: OrganisationTypeService,
        private sectorService: SectorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.registrationInformationService.query()
            .subscribe((res: ResponseWrapper) => { this.registrationinformations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.personService
            .query({filter: 'basicinformation-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.basicInformation.name || !this.basicInformation.name.id) {
                    this.names = res.json;
                } else {
                    this.personService
                        .find(this.basicInformation.name.id)
                        .subscribe((subRes: Person) => {
                            this.names = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.personService
            .query({filter: 'basicinformation-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.basicInformation.father || !this.basicInformation.father.id) {
                    this.fathers = res.json;
                } else {
                    this.personService
                        .find(this.basicInformation.father.id)
                        .subscribe((subRes: Person) => {
                            this.fathers = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.personService
            .query({filter: 'basicinformation-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.basicInformation.mother || !this.basicInformation.mother.id) {
                    this.mothers = res.json;
                } else {
                    this.personService
                        .find(this.basicInformation.mother.id)
                        .subscribe((subRes: Person) => {
                            this.mothers = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.residentialStatusService.query()
            .subscribe((res: ResponseWrapper) => { this.residentialstatuses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.maritalStatusService.query()
            .subscribe((res: ResponseWrapper) => { this.maritalstatuses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.genderService.query()
            .subscribe((res: ResponseWrapper) => { this.genders = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.occupationService.query()
            .subscribe((res: ResponseWrapper) => { this.occupations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.employersService.query()
            .subscribe((res: ResponseWrapper) => { this.employers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.organisationTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.organisationtypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.sectorService.query()
            .subscribe((res: ResponseWrapper) => { this.sectors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.basicInformation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.basicInformationService.update(this.basicInformation));
        } else {
            this.subscribeToSaveResponse(
                this.basicInformationService.create(this.basicInformation));
        }
    }

    private subscribeToSaveResponse(result: Observable<BasicInformation>) {
        result.subscribe((res: BasicInformation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: BasicInformation) {
        this.eventManager.broadcast({ name: 'basicInformationListModification', content: 'OK'});
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

    trackRegistrationInformationById(index: number, item: RegistrationInformation) {
        return item.id;
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }

    trackResidentialStatusById(index: number, item: ResidentialStatus) {
        return item.id;
    }

    trackMaritalStatusById(index: number, item: MaritalStatus) {
        return item.id;
    }

    trackGenderById(index: number, item: Gender) {
        return item.id;
    }

    trackOccupationById(index: number, item: Occupation) {
        return item.id;
    }

    trackEmployersById(index: number, item: Employers) {
        return item.id;
    }

    trackOrganisationTypeById(index: number, item: OrganisationType) {
        return item.id;
    }

    trackSectorById(index: number, item: Sector) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-basic-information-popup',
    template: ''
})
export class BasicInformationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private basicInformationPopupService: BasicInformationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.basicInformationPopupService
                    .open(BasicInformationDialogComponent, params['id']);
            } else {
                this.modalRef = this.basicInformationPopupService
                    .open(BasicInformationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
