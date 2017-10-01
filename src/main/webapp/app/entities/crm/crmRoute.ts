import {Routes} from "@angular/router";
import {UserRouteAccessService} from "../../shared/auth/user-route-access-service";
import {CrmDialogComponent} from "./crm-dialog.component";
import {CrmComponent} from "./crm.component";
import {CrmAddressComponent} from "./crm-address.component";
import {CrmNewAddressComponent} from "./crm-new-address.component";
import {CrmBasicInformationComponent} from "./crm-basic-information.component";
import {RaisedTicketComponent} from "./raised-ticket.component";
import {TicketComponent} from "./ticket.component";
import {TicketStatusUpdateComponent} from "./ticket-status-update.component";

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
        path: 'crm-basic-info/:regId',
        component: CrmBasicInformationComponent,
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
    },
    {
        path: 'new-ticket',
        component: RaisedTicketComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Raised a Ticket for Customer'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tickets',
        component: TicketComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tickets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'update-ticket-status/:id',
        component: TicketStatusUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tickets status update'
        },
        canActivate: [UserRouteAccessService],
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
