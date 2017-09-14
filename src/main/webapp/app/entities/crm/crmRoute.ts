import {Routes} from "@angular/router";
import {UserRouteAccessService} from "../../shared/auth/user-route-access-service";
import {CrmDialogComponent} from "./crm-dialog.component";
import {CrmComponent} from "./crm.component";
import {CrmAddressComponent} from "./crm-address.component";
import {CrmNewAddressComponent} from "./crm-new-address.component";

export const crmPopupRoute: Routes = [
    {
        path: 'crm-add',
        component: CrmDialogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers Relationship Model'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'crm-address/:regId',
        component: CrmAddressComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers Relationship Model'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'crm-new-address/:regId',
        component: CrmNewAddressComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers Relationship Model'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'crm-address/:id/edit',
        component: CrmNewAddressComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers Relationship Model'
        },
        canActivate: [UserRouteAccessService]
    }

]

export const crmRoute: Routes = [
    {
        path: 'crm',
        component: CrmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers Relationship Model'
        },
        canActivate: [UserRouteAccessService],
    }
]
