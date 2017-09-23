import {crmPopupRoute, crmRoute} from "./crmRoute";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CrmDialogComponent} from "./crm-dialog.component";
import {Smartfca001SharedModule} from "../../shared/shared.module";
import {CrmService} from "./crm.service";
import {CRMContactPersonComponent} from "./contactPerson.component";
import {CrmComponent} from "./crm.component";
import {CrmAddressComponent} from "./crm-address.component";
import {CrmNewAddressComponent} from "./crm-new-address.component";
import {ContactInfoComponent} from "./contact-info.component";
import {CrmBasicInformationComponent} from "./crm-basic-information.component";
import {RaisedTicketComponent} from "./raised-ticket.component";

const ENTITY_STATES = [
    ...crmPopupRoute,
    ...crmRoute
]

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        CrmDialogComponent,
        CRMContactPersonComponent,
        CrmComponent,
        CrmAddressComponent,
        CrmNewAddressComponent,
        ContactInfoComponent,
        CrmBasicInformationComponent,
        RaisedTicketComponent
    ],
    entryComponents: [
        CrmComponent,
    ],
    providers: [
        CrmService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class CustomerRelationModule {

}
