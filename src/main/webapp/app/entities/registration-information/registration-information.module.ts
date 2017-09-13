import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    RegistrationInformationService,
    RegistrationInformationPopupService,
    RegistrationInformationComponent,
    RegistrationInformationDetailComponent,
    RegistrationInformationDialogComponent,
    RegistrationInformationPopupComponent,
    RegistrationInformationDeletePopupComponent,
    RegistrationInformationDeleteDialogComponent,
    registrationInformationRoute,
    registrationInformationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...registrationInformationRoute,
    ...registrationInformationPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegistrationInformationComponent,
        RegistrationInformationDetailComponent,
        RegistrationInformationDialogComponent,
        RegistrationInformationDeleteDialogComponent,
        RegistrationInformationPopupComponent,
        RegistrationInformationDeletePopupComponent,
    ],
    entryComponents: [
        RegistrationInformationComponent,
        RegistrationInformationDialogComponent,
        RegistrationInformationPopupComponent,
        RegistrationInformationDeleteDialogComponent,
        RegistrationInformationDeletePopupComponent,
    ],
    providers: [
        RegistrationInformationService,
        RegistrationInformationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001RegistrationInformationModule {}
