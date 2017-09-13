import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    ResidentialStatusService,
    ResidentialStatusPopupService,
    ResidentialStatusComponent,
    ResidentialStatusDetailComponent,
    ResidentialStatusDialogComponent,
    ResidentialStatusPopupComponent,
    ResidentialStatusDeletePopupComponent,
    ResidentialStatusDeleteDialogComponent,
    residentialStatusRoute,
    residentialStatusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...residentialStatusRoute,
    ...residentialStatusPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResidentialStatusComponent,
        ResidentialStatusDetailComponent,
        ResidentialStatusDialogComponent,
        ResidentialStatusDeleteDialogComponent,
        ResidentialStatusPopupComponent,
        ResidentialStatusDeletePopupComponent,
    ],
    entryComponents: [
        ResidentialStatusComponent,
        ResidentialStatusDialogComponent,
        ResidentialStatusPopupComponent,
        ResidentialStatusDeleteDialogComponent,
        ResidentialStatusDeletePopupComponent,
    ],
    providers: [
        ResidentialStatusService,
        ResidentialStatusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001ResidentialStatusModule {}
