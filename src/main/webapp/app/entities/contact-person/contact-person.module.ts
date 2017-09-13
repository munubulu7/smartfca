import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    ContactPersonService,
    ContactPersonPopupService,
    ContactPersonComponent,
    ContactPersonDetailComponent,
    ContactPersonDialogComponent,
    ContactPersonPopupComponent,
    ContactPersonDeletePopupComponent,
    ContactPersonDeleteDialogComponent,
    contactPersonRoute,
    contactPersonPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contactPersonRoute,
    ...contactPersonPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ContactPersonComponent,
        ContactPersonDetailComponent,
        ContactPersonDialogComponent,
        ContactPersonDeleteDialogComponent,
        ContactPersonPopupComponent,
        ContactPersonDeletePopupComponent,
    ],
    entryComponents: [
        ContactPersonComponent,
        ContactPersonDialogComponent,
        ContactPersonPopupComponent,
        ContactPersonDeleteDialogComponent,
        ContactPersonDeletePopupComponent,
    ],
    providers: [
        ContactPersonService,
        ContactPersonPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001ContactPersonModule {}
