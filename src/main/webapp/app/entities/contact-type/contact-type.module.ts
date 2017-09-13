import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    ContactTypeService,
    ContactTypePopupService,
    ContactTypeComponent,
    ContactTypeDetailComponent,
    ContactTypeDialogComponent,
    ContactTypePopupComponent,
    ContactTypeDeletePopupComponent,
    ContactTypeDeleteDialogComponent,
    contactTypeRoute,
    contactTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...contactTypeRoute,
    ...contactTypePopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ContactTypeComponent,
        ContactTypeDetailComponent,
        ContactTypeDialogComponent,
        ContactTypeDeleteDialogComponent,
        ContactTypePopupComponent,
        ContactTypeDeletePopupComponent,
    ],
    entryComponents: [
        ContactTypeComponent,
        ContactTypeDialogComponent,
        ContactTypePopupComponent,
        ContactTypeDeleteDialogComponent,
        ContactTypeDeletePopupComponent,
    ],
    providers: [
        ContactTypeService,
        ContactTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001ContactTypeModule {}
