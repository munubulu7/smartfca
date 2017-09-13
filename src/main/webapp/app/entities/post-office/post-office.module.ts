import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    PostOfficeService,
    PostOfficePopupService,
    PostOfficeComponent,
    PostOfficeDetailComponent,
    PostOfficeDialogComponent,
    PostOfficePopupComponent,
    PostOfficeDeletePopupComponent,
    PostOfficeDeleteDialogComponent,
    postOfficeRoute,
    postOfficePopupRoute,
} from './';

const ENTITY_STATES = [
    ...postOfficeRoute,
    ...postOfficePopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PostOfficeComponent,
        PostOfficeDetailComponent,
        PostOfficeDialogComponent,
        PostOfficeDeleteDialogComponent,
        PostOfficePopupComponent,
        PostOfficeDeletePopupComponent,
    ],
    entryComponents: [
        PostOfficeComponent,
        PostOfficeDialogComponent,
        PostOfficePopupComponent,
        PostOfficeDeleteDialogComponent,
        PostOfficeDeletePopupComponent,
    ],
    providers: [
        PostOfficeService,
        PostOfficePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001PostOfficeModule {}
