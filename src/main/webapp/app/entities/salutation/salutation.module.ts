import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    SalutationService,
    SalutationPopupService,
    SalutationComponent,
    SalutationDetailComponent,
    SalutationDialogComponent,
    SalutationPopupComponent,
    SalutationDeletePopupComponent,
    SalutationDeleteDialogComponent,
    salutationRoute,
    salutationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...salutationRoute,
    ...salutationPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SalutationComponent,
        SalutationDetailComponent,
        SalutationDialogComponent,
        SalutationDeleteDialogComponent,
        SalutationPopupComponent,
        SalutationDeletePopupComponent,
    ],
    entryComponents: [
        SalutationComponent,
        SalutationDialogComponent,
        SalutationPopupComponent,
        SalutationDeleteDialogComponent,
        SalutationDeletePopupComponent,
    ],
    providers: [
        SalutationService,
        SalutationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001SalutationModule {}
