import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BasicInformation} from "../basic-information/basic-information.model";
import {CrmService} from "./crm.service";
import {JhiAlertService} from "ng-jhipster";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {OrganisationType} from "../organisation-type/organisation-type.model";
import {OrganisationTypeService} from "../organisation-type/organisation-type.service";
import {Salutation} from "../salutation/salutation.model";
import {SalutationService} from "../salutation/salutation.service";
import {Person} from "../person/person.model";
import {CrmContactPerson} from "./crm.contactPerson";
import {ContactInfo} from "../contact-info/contact-info.model";
import {Sector} from "../sector/sector.model";
import {SectorService} from "../sector/sector.service";
import {Employers} from "../employers/employers.model";
import {ResidentialStatus} from "../residential-status/residential-status.model";
import {ResidentialStatusService} from "../residential-status/residential-status.service";
import {Gender} from "../gender/gender.model";
import {MaritalStatus} from "../marital-status/marital-status.model";
import {Occupation} from "../occupation/occupation.model";
import {GenderService} from "../gender/gender.service";
import {MaritalStatusService} from "../marital-status/marital-status.service";
import {OccupationService} from "../occupation/occupation.service";
import {AddressType} from "../address-type/address-type.model";
import {AddressTypeService} from "../address-type/address-type.service";
import {RegistrationInformationService} from "../registration-information/registration-information.service";
import {RegistrationInformation} from "../registration-information/registration-information.model";

@Component({
    selector: 'crm-basic-info',
    templateUrl: './crm-basic-information.component.html',
    styleUrls: [
        '../../../resources/css/font-awesome.min.css',
        '../../../resources/css/bootstrap.css',
        '../../../resources/css/responsive.css'
    ]
})
export class CrmBasicInformationComponent implements OnInit, OnDestroy {

    routeSub: any;
    basicInformation: BasicInformation[] = [];
    personalBasicInfo: BasicInformation = new BasicInformation;
    businessBasicInfo: BasicInformation = new BasicInformation;
    organisationTypeList: OrganisationType[];
    salutations: Salutation[];
    sectorList: Sector[];
    employersList: Employers[];
    genderList: Gender[];
    maritalStatuses: MaritalStatus[];
    occupationList: Occupation[];
    addressTypeList: AddressType[];
    residentialStatuses: ResidentialStatus[];
    contactPersonFromGroup: CrmContactPerson[] = [];
    name: Person;
    father: Person;
    mother: Person;
    isPersonal: boolean = false;


    constructor(private alertService: JhiAlertService,
                private route: ActivatedRoute,
                private genderService: GenderService,
                private addressTypeService: AddressTypeService,
                private occupationService: OccupationService,
                private maritalStatusService: MaritalStatusService,
                private organisationTypeService: OrganisationTypeService,
                private residentialStatusService: ResidentialStatusService,
                private sectorService: SectorService,
                private salutationService: SalutationService,
                private registrationInformationService: RegistrationInformationService,
                private crmService: CrmService) {
    }

    reset() {
        this.father = new Person();
        this.mother = new Person();
        this.name = new Person();

        this.personalBasicInfo = new BasicInformation();
        this.businessBasicInfo = new BasicInformation();
    }

    ngOnInit(): void {
        this.reset();
        this.organisationTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.organisationTypeList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.salutationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.salutations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.genderService.query().subscribe(
            (res: ResponseWrapper) => {
                this.genderList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.maritalStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.maritalStatuses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.occupationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.occupationList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.sectorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sectorList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.addressTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.addressTypeList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.residentialStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.residentialStatuses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.routeSub = this.route.params.subscribe(param =>
            this.crmService.getBasicinformationByRegistration(param['regId']).subscribe(
                (res: ResponseWrapper) => {
                    this.basicInformation = res.json;
                    this.registrationInformationService.find(param['regId']).subscribe((regInfo: ResponseWrapper) => {
                            let tempRegInfo: RegistrationInformation = regInfo;
                            if (tempRegInfo.registrationType.type == 'Personal') {
                                this.isPersonal = true;
                                if(this.basicInformation.length>0){
                                    this.personalBasicInfo = this.basicInformation[0];
                                }
                            } else {
                                this.isPersonal = false;
                                this.businessBasicInfo = this.basicInformation[0];
                                this.crmService.getContactPersonByBasicInformationId(this.businessBasicInfo.id).subscribe(
                                    (contRes: ResponseWrapper) => {
                                        contRes.json.map((item) => {
                                            let sampleContactPerson = new CrmContactPerson();
                                            sampleContactPerson.persons = item.persons;
                                            sampleContactPerson.designation = item.designation;
                                            sampleContactPerson.contactInfoList = [];
                                            sampleContactPerson.contactInfoList.push(new ContactInfo());
                                            this.contactPersonFromGroup.push(sampleContactPerson);
                                        });
                                    },
                                    (contRes: ResponseWrapper) => this.onError(contRes.json)
                                );
                            }
                        },
                        (regInfoErr: ResponseWrapper) => this.onError(regInfoErr.json)
                    );
                },
                (res: ResponseWrapper) => this.onError(res.json)
            )
        );
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    deleteContactPerson(index: number) {
        this.contactPersonFromGroup.splice(index, 1);
    }

    addContactPerson() {
        let sampleContactPerson = new CrmContactPerson();
        sampleContactPerson.persons = new Person;
        sampleContactPerson.contactInfoList = [];
        sampleContactPerson.contactInfoList.push(new ContactInfo());
        this.contactPersonFromGroup.push(sampleContactPerson);
    }

    populateEmployers() {
        this.crmService.getEmployersByOccupation(this.personalBasicInfo.occupation.id).subscribe(
            (res: ResponseWrapper) => {
                this.employersList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    saveBasicInfo() {

    }

    ngOnDestroy(): void {
        //throw new Error("Method not implemented.");
    }

}
