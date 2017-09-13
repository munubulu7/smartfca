import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    AddressForService,
    AddressForPopupService,
    AddressForComponent,
    AddressForDetailComponent,
    AddressForDialogComponent,
    AddressForPopupComponent,
    AddressForDeletePopupComponent,
    AddressForDeleteDialogComponent,
    addressForRoute,
    addressForPopupRoute,
} from './';

const ENTITY_STATES = [
    ...addressForRoute,
    ...addressForPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AddressForComponent,
        AddressForDetailComponent,
        AddressForDialogComponent,
        AddressForDeleteDialogComponent,
        AddressForPopupComponent,
        AddressForDeletePopupComponent,
    ],
    entryComponents: [
        AddressForComponent,
        AddressForDialogComponent,
        AddressForPopupComponent,
        AddressForDeleteDialogComponent,
        AddressForDeletePopupComponent,
    ],
    providers: [
        AddressForService,
        AddressForPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001AddressForModule {}
