import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SalutationService} from "../salutation/salutation.service";
import {Salutation} from "../salutation/salutation.model";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {JhiAlertService} from "ng-jhipster";
import {Person} from "../person/person.model";
import {Designation} from "../designation/designation.model";
import {DesignationService} from "../designation/designation.service";
import {CrmContactPerson} from "./crm.contactPerson";
import {ContactType} from "../contact-type/contact-type.model";
import {ContactTypeService} from "../contact-type/contact-type.service";
import {ContactInfo} from "../contact-info/contact-info.model";


@Component({
    selector: 'crm-contact-person',
    templateUrl: './contactPerson.component.html',
    styleUrls: [
        '../../../resources/css/font-awesome.min.css',
        '../../../resources/css/bootstrap.css',
        '../../../resources/css/responsive.css'
    ]
})

export class CRMContactPersonComponent implements OnInit {
    salutationList: Salutation[];
    designationList: Designation[];
    contactTypeList: ContactType[];
    person: Person;

    @Output()
    removeComponent: EventEmitter<string> = new EventEmitter();

    @Input() contactPerson: CrmContactPerson;

    constructor(private alertService: JhiAlertService,
                private salutationService: SalutationService,
                private contactTypeService: ContactTypeService,
                private designationService: DesignationService) {

    }

    ngOnInit(): void {
        this.person = new Person;
        this.salutationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.salutationList = res.json;
            },
            (res: ResponseWrapper) => {
                this.alertService.error(res.json.message, null, null);
            }
        );
        this.designationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.designationList = res.json;
            },
            (res: ResponseWrapper) => {
                this.alertService.error(res.json.message, null, null);
            }
        );
        this.contactTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contactTypeList = res.json;
            },
            (res: ResponseWrapper) => {
                this.alertService.error(res.json.message, null, null);
            }
        );
    }

    deleteComponent() {
        this.removeComponent.emit();
    }

    addContactInfo() {
        this.contactPerson.contactInfoList.push(new ContactInfo);
    }

    deleteContactInfo(i: number) {
        this.contactPerson.contactInfoList.splice(i, 1);
    }
}
