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
    personalBasicInfo: BasicInformation;
    businessBasicInfo: BasicInformation;
    organisationTypeList: OrganisationType[];
    salutations: Salutation[];
    sectorList: Sector[];
    contactPersonFromGroup: CrmContactPerson[] = [];
    name: Person;
    father: Person;
    mother: Person;
    isPersonal: boolean = false;



    constructor(private alertService: JhiAlertService,
                private route: ActivatedRoute,
                private organisationTypeService: OrganisationTypeService,
                private sectorService: SectorService,
                private salutationService: SalutationService,
                private crmService: CrmService) {
    }

    reset(){
        this.father = new Person();
        this.mother = new Person();
        this.name = new Person();
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
        this.sectorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sectorList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.routeSub = this.route.params.subscribe(param =>
            this.crmService.getBasicinformationByRegistration(param['regId']).subscribe(
                (res: ResponseWrapper) => {
                    this.basicInformation = res.json;
                    this.businessBasicInfo = this.basicInformation[0];
                    this.personalBasicInfo = this.basicInformation[0];
                    debugger;
                    this.businessBasicInfo.contactPersons.map((item)=>{
                        let sampleContactPerson = new CrmContactPerson();
                        sampleContactPerson.persons = new Person;
                        sampleContactPerson.contactInfoList = [];
                        sampleContactPerson.contactInfoList.push(new ContactInfo());
                        this.contactPersonFromGroup.push(sampleContactPerson);
                    });
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

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

}
