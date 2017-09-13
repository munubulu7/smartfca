import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    CenterLocationService,
    CenterLocationPopupService,
    CenterLocationComponent,
    CenterLocationDetailComponent,
    CenterLocationDialogComponent,
    CenterLocationPopupComponent,
    CenterLocationDeletePopupComponent,
    CenterLocationDeleteDialogComponent,
    centerLocationRoute,
    centerLocationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...centerLocationRoute,
    ...centerLocationPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CenterLocationComponent,
        CenterLocationDetailComponent,
        CenterLocationDialogComponent,
        CenterLocationDeleteDialogComponent,
        CenterLocationPopupComponent,
        CenterLocationDeletePopupComponent,
    ],
    entryComponents: [
        CenterLocationComponent,
        CenterLocationDialogComponent,
        CenterLocationPopupComponent,
        CenterLocationDeleteDialogComponent,
        CenterLocationDeletePopupComponent,
    ],
    providers: [
        CenterLocationService,
        CenterLocationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001CenterLocationModule {}
