import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    AreaTypeService,
    AreaTypePopupService,
    AreaTypeComponent,
    AreaTypeDetailComponent,
    AreaTypeDialogComponent,
    AreaTypePopupComponent,
    AreaTypeDeletePopupComponent,
    AreaTypeDeleteDialogComponent,
    areaTypeRoute,
    areaTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...areaTypeRoute,
    ...areaTypePopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AreaTypeComponent,
        AreaTypeDetailComponent,
        AreaTypeDialogComponent,
        AreaTypeDeleteDialogComponent,
        AreaTypePopupComponent,
        AreaTypeDeletePopupComponent,
    ],
    entryComponents: [
        AreaTypeComponent,
        AreaTypeDialogComponent,
        AreaTypePopupComponent,
        AreaTypeDeleteDialogComponent,
        AreaTypeDeletePopupComponent,
    ],
    providers: [
        AreaTypeService,
        AreaTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001AreaTypeModule {}
