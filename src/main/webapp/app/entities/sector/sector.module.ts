import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    SectorService,
    SectorPopupService,
    SectorComponent,
    SectorDetailComponent,
    SectorDialogComponent,
    SectorPopupComponent,
    SectorDeletePopupComponent,
    SectorDeleteDialogComponent,
    sectorRoute,
    sectorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sectorRoute,
    ...sectorPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SectorComponent,
        SectorDetailComponent,
        SectorDialogComponent,
        SectorDeleteDialogComponent,
        SectorPopupComponent,
        SectorDeletePopupComponent,
    ],
    entryComponents: [
        SectorComponent,
        SectorDialogComponent,
        SectorPopupComponent,
        SectorDeleteDialogComponent,
        SectorDeletePopupComponent,
    ],
    providers: [
        SectorService,
        SectorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001SectorModule {}
