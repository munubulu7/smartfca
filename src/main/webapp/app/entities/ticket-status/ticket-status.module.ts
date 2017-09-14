import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    TicketStatusService,
    TicketStatusPopupService,
    TicketStatusComponent,
    TicketStatusDetailComponent,
    TicketStatusDialogComponent,
    TicketStatusPopupComponent,
    TicketStatusDeletePopupComponent,
    TicketStatusDeleteDialogComponent,
    ticketStatusRoute,
    ticketStatusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ticketStatusRoute,
    ...ticketStatusPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TicketStatusComponent,
        TicketStatusDetailComponent,
        TicketStatusDialogComponent,
        TicketStatusDeleteDialogComponent,
        TicketStatusPopupComponent,
        TicketStatusDeletePopupComponent,
    ],
    entryComponents: [
        TicketStatusComponent,
        TicketStatusDialogComponent,
        TicketStatusPopupComponent,
        TicketStatusDeleteDialogComponent,
        TicketStatusDeletePopupComponent,
    ],
    providers: [
        TicketStatusService,
        TicketStatusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001TicketStatusModule {}
