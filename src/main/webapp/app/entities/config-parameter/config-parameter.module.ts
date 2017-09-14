import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    ConfigParameterService,
    ConfigParameterPopupService,
    ConfigParameterComponent,
    ConfigParameterDetailComponent,
    ConfigParameterDialogComponent,
    ConfigParameterPopupComponent,
    ConfigParameterDeletePopupComponent,
    ConfigParameterDeleteDialogComponent,
    configParameterRoute,
    configParameterPopupRoute,
} from './';

const ENTITY_STATES = [
    ...configParameterRoute,
    ...configParameterPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ConfigParameterComponent,
        ConfigParameterDetailComponent,
        ConfigParameterDialogComponent,
        ConfigParameterDeleteDialogComponent,
        ConfigParameterPopupComponent,
        ConfigParameterDeletePopupComponent,
    ],
    entryComponents: [
        ConfigParameterComponent,
        ConfigParameterDialogComponent,
        ConfigParameterPopupComponent,
        ConfigParameterDeleteDialogComponent,
        ConfigParameterDeletePopupComponent,
    ],
    providers: [
        ConfigParameterService,
        ConfigParameterPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001ConfigParameterModule {}
