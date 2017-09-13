import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    ContactInfoService,
    ContactInfoPopupService,
    ContactInfoComponent,
    ContactInfoDetailComponent,
    ContactInfoDialogComponent,
    ContactInfoPopupComponent,
    ContactInfoDeletePopupComponent,
    ContactInfoDeleteDialogComponent,
    contactInfoRoute,
    contactInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contactInfoRoute,
    ...contactInfoPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ContactInfoComponent,
        ContactInfoDetailComponent,
        ContactInfoDialogComponent,
        ContactInfoDeleteDialogComponent,
        ContactInfoPopupComponent,
        ContactInfoDeletePopupComponent,
    ],
    entryComponents: [
        ContactInfoComponent,
        ContactInfoDialogComponent,
        ContactInfoPopupComponent,
        ContactInfoDeleteDialogComponent,
        ContactInfoDeletePopupComponent,
    ],
    providers: [
        ContactInfoService,
        ContactInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001ContactInfoModule {}
