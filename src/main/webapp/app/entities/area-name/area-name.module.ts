import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    AreaNameService,
    AreaNamePopupService,
    AreaNameComponent,
    AreaNameDetailComponent,
    AreaNameDialogComponent,
    AreaNamePopupComponent,
    AreaNameDeletePopupComponent,
    AreaNameDeleteDialogComponent,
    areaNameRoute,
    areaNamePopupRoute,
} from './';

const ENTITY_STATES = [
    ...areaNameRoute,
    ...areaNamePopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AreaNameComponent,
        AreaNameDetailComponent,
        AreaNameDialogComponent,
        AreaNameDeleteDialogComponent,
        AreaNamePopupComponent,
        AreaNameDeletePopupComponent,
    ],
    entryComponents: [
        AreaNameComponent,
        AreaNameDialogComponent,
        AreaNamePopupComponent,
        AreaNameDeleteDialogComponent,
        AreaNameDeletePopupComponent,
    ],
    providers: [
        AreaNameService,
        AreaNamePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001AreaNameModule {}
