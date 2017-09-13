import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    EmployersService,
    EmployersPopupService,
    EmployersComponent,
    EmployersDetailComponent,
    EmployersDialogComponent,
    EmployersPopupComponent,
    EmployersDeletePopupComponent,
    EmployersDeleteDialogComponent,
    employersRoute,
    employersPopupRoute,
} from './';

const ENTITY_STATES = [
    ...employersRoute,
    ...employersPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EmployersComponent,
        EmployersDetailComponent,
        EmployersDialogComponent,
        EmployersDeleteDialogComponent,
        EmployersPopupComponent,
        EmployersDeletePopupComponent,
    ],
    entryComponents: [
        EmployersComponent,
        EmployersDialogComponent,
        EmployersPopupComponent,
        EmployersDeleteDialogComponent,
        EmployersDeletePopupComponent,
    ],
    providers: [
        EmployersService,
        EmployersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001EmployersModule {}
