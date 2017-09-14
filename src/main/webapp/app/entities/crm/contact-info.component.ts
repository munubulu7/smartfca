import {Component, Input, OnInit} from "@angular/core";
import {ContactInfo} from "../contact-info/contact-info.model";
import {ContactType} from "../contact-type/contact-type.model";
import {JhiAlertService} from "ng-jhipster";
import {ContactTypeService} from "../contact-type/contact-type.service";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";

@Component({
    selector: 'crm-contact-info',
    templateUrl: './contact-info.component.html',
    styleUrls: [
        '../../../resources/css/font-awesome.min.css',
        '../../../resources/css/bootstrap.css',
        '../../../resources/css/responsive.css'
    ]
})
export class ContactInfoComponent implements OnInit {
    @Input() contactInfoList: ContactInfo[];
    contactTypeList: ContactType[];

    constructor(private alertService: JhiAlertService,
                private contactTypeService: ContactTypeService) {

    }

    ngOnInit(): void {
        this.contactTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contactTypeList = res.json;
            },
            (res: ResponseWrapper) => {
                this.alertService.error(res.json.message, null, null);
            }
        );
    }

    addContactInfo() {
        this.contactInfoList.push(new ContactInfo);
    }

    deleteContactInfo(i: number) {
        this.contactInfoList.splice(i, 1);
    }
}
