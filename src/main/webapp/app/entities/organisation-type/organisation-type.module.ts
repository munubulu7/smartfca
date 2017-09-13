import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    OrganisationTypeService,
    OrganisationTypePopupService,
    OrganisationTypeComponent,
    OrganisationTypeDetailComponent,
    OrganisationTypeDialogComponent,
    OrganisationTypePopupComponent,
    OrganisationTypeDeletePopupComponent,
    OrganisationTypeDeleteDialogComponent,
    organisationTypeRoute,
    organisationTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...organisationTypeRoute,
    ...organisationTypePopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrganisationTypeComponent,
        OrganisationTypeDetailComponent,
        OrganisationTypeDialogComponent,
        OrganisationTypeDeleteDialogComponent,
        OrganisationTypePopupComponent,
        OrganisationTypeDeletePopupComponent,
    ],
    entryComponents: [
        OrganisationTypeComponent,
        OrganisationTypeDialogComponent,
        OrganisationTypePopupComponent,
        OrganisationTypeDeleteDialogComponent,
        OrganisationTypeDeletePopupComponent,
    ],
    providers: [
        OrganisationTypeService,
        OrganisationTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001OrganisationTypeModule {}
