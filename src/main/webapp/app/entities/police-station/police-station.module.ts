import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    PoliceStationService,
    PoliceStationPopupService,
    PoliceStationComponent,
    PoliceStationDetailComponent,
    PoliceStationDialogComponent,
    PoliceStationPopupComponent,
    PoliceStationDeletePopupComponent,
    PoliceStationDeleteDialogComponent,
    policeStationRoute,
    policeStationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...policeStationRoute,
    ...policeStationPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PoliceStationComponent,
        PoliceStationDetailComponent,
        PoliceStationDialogComponent,
        PoliceStationDeleteDialogComponent,
        PoliceStationPopupComponent,
        PoliceStationDeletePopupComponent,
    ],
    entryComponents: [
        PoliceStationComponent,
        PoliceStationDialogComponent,
        PoliceStationPopupComponent,
        PoliceStationDeleteDialogComponent,
        PoliceStationDeletePopupComponent,
    ],
    providers: [
        PoliceStationService,
        PoliceStationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001PoliceStationModule {}
