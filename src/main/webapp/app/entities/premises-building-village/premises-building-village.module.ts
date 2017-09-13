import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    PremisesBuildingVillageService,
    PremisesBuildingVillagePopupService,
    PremisesBuildingVillageComponent,
    PremisesBuildingVillageDetailComponent,
    PremisesBuildingVillageDialogComponent,
    PremisesBuildingVillagePopupComponent,
    PremisesBuildingVillageDeletePopupComponent,
    PremisesBuildingVillageDeleteDialogComponent,
    premisesBuildingVillageRoute,
    premisesBuildingVillagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...premisesBuildingVillageRoute,
    ...premisesBuildingVillagePopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PremisesBuildingVillageComponent,
        PremisesBuildingVillageDetailComponent,
        PremisesBuildingVillageDialogComponent,
        PremisesBuildingVillageDeleteDialogComponent,
        PremisesBuildingVillagePopupComponent,
        PremisesBuildingVillageDeletePopupComponent,
    ],
    entryComponents: [
        PremisesBuildingVillageComponent,
        PremisesBuildingVillageDialogComponent,
        PremisesBuildingVillagePopupComponent,
        PremisesBuildingVillageDeleteDialogComponent,
        PremisesBuildingVillageDeletePopupComponent,
    ],
    providers: [
        PremisesBuildingVillageService,
        PremisesBuildingVillagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001PremisesBuildingVillageModule {}
