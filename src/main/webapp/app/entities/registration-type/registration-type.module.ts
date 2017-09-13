import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    RegistrationTypeService,
    RegistrationTypePopupService,
    RegistrationTypeComponent,
    RegistrationTypeDetailComponent,
    RegistrationTypeDialogComponent,
    RegistrationTypePopupComponent,
    RegistrationTypeDeletePopupComponent,
    RegistrationTypeDeleteDialogComponent,
    registrationTypeRoute,
    registrationTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...registrationTypeRoute,
    ...registrationTypePopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegistrationTypeComponent,
        RegistrationTypeDetailComponent,
        RegistrationTypeDialogComponent,
        RegistrationTypeDeleteDialogComponent,
        RegistrationTypePopupComponent,
        RegistrationTypeDeletePopupComponent,
    ],
    entryComponents: [
        RegistrationTypeComponent,
        RegistrationTypeDialogComponent,
        RegistrationTypePopupComponent,
        RegistrationTypeDeleteDialogComponent,
        RegistrationTypeDeletePopupComponent,
    ],
    providers: [
        RegistrationTypeService,
        RegistrationTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001RegistrationTypeModule {}
