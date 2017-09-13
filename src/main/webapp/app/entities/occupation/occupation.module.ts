import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    OccupationService,
    OccupationPopupService,
    OccupationComponent,
    OccupationDetailComponent,
    OccupationDialogComponent,
    OccupationPopupComponent,
    OccupationDeletePopupComponent,
    OccupationDeleteDialogComponent,
    occupationRoute,
    occupationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...occupationRoute,
    ...occupationPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OccupationComponent,
        OccupationDetailComponent,
        OccupationDialogComponent,
        OccupationDeleteDialogComponent,
        OccupationPopupComponent,
        OccupationDeletePopupComponent,
    ],
    entryComponents: [
        OccupationComponent,
        OccupationDialogComponent,
        OccupationPopupComponent,
        OccupationDeleteDialogComponent,
        OccupationDeletePopupComponent,
    ],
    providers: [
        OccupationService,
        OccupationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001OccupationModule {}
