import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    BasicInformationService,
    BasicInformationPopupService,
    BasicInformationComponent,
    BasicInformationDetailComponent,
    BasicInformationDialogComponent,
    BasicInformationPopupComponent,
    BasicInformationDeletePopupComponent,
    BasicInformationDeleteDialogComponent,
    basicInformationRoute,
    basicInformationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...basicInformationRoute,
    ...basicInformationPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BasicInformationComponent,
        BasicInformationDetailComponent,
        BasicInformationDialogComponent,
        BasicInformationDeleteDialogComponent,
        BasicInformationPopupComponent,
        BasicInformationDeletePopupComponent,
    ],
    entryComponents: [
        BasicInformationComponent,
        BasicInformationDialogComponent,
        BasicInformationPopupComponent,
        BasicInformationDeleteDialogComponent,
        BasicInformationDeletePopupComponent,
    ],
    providers: [
        BasicInformationService,
        BasicInformationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001BasicInformationModule {}
