import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    PincodeService,
    PincodePopupService,
    PincodeComponent,
    PincodeDetailComponent,
    PincodeDialogComponent,
    PincodePopupComponent,
    PincodeDeletePopupComponent,
    PincodeDeleteDialogComponent,
    pincodeRoute,
    pincodePopupRoute,
} from './';

const ENTITY_STATES = [
    ...pincodeRoute,
    ...pincodePopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PincodeComponent,
        PincodeDetailComponent,
        PincodeDialogComponent,
        PincodeDeleteDialogComponent,
        PincodePopupComponent,
        PincodeDeletePopupComponent,
    ],
    entryComponents: [
        PincodeComponent,
        PincodeDialogComponent,
        PincodePopupComponent,
        PincodeDeleteDialogComponent,
        PincodeDeletePopupComponent,
    ],
    providers: [
        PincodeService,
        PincodePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001PincodeModule {}
