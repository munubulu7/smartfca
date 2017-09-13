import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    DesignationService,
    DesignationPopupService,
    DesignationComponent,
    DesignationDetailComponent,
    DesignationDialogComponent,
    DesignationPopupComponent,
    DesignationDeletePopupComponent,
    DesignationDeleteDialogComponent,
    designationRoute,
    designationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...designationRoute,
    ...designationPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DesignationComponent,
        DesignationDetailComponent,
        DesignationDialogComponent,
        DesignationDeleteDialogComponent,
        DesignationPopupComponent,
        DesignationDeletePopupComponent,
    ],
    entryComponents: [
        DesignationComponent,
        DesignationDialogComponent,
        DesignationPopupComponent,
        DesignationDeleteDialogComponent,
        DesignationDeletePopupComponent,
    ],
    providers: [
        DesignationService,
        DesignationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001DesignationModule {}
