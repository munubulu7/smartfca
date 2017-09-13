import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    AddressInformationService,
    AddressInformationPopupService,
    AddressInformationComponent,
    AddressInformationDetailComponent,
    AddressInformationDialogComponent,
    AddressInformationPopupComponent,
    AddressInformationDeletePopupComponent,
    AddressInformationDeleteDialogComponent,
    addressInformationRoute,
    addressInformationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...addressInformationRoute,
    ...addressInformationPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AddressInformationComponent,
        AddressInformationDetailComponent,
        AddressInformationDialogComponent,
        AddressInformationDeleteDialogComponent,
        AddressInformationPopupComponent,
        AddressInformationDeletePopupComponent,
    ],
    entryComponents: [
        AddressInformationComponent,
        AddressInformationDialogComponent,
        AddressInformationPopupComponent,
        AddressInformationDeleteDialogComponent,
        AddressInformationDeletePopupComponent,
    ],
    providers: [
        AddressInformationService,
        AddressInformationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001AddressInformationModule {}
