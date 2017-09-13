import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Smartfca001SharedModule } from '../../shared';
import {
    CityDistrictTownService,
    CityDistrictTownPopupService,
    CityDistrictTownComponent,
    CityDistrictTownDetailComponent,
    CityDistrictTownDialogComponent,
    CityDistrictTownPopupComponent,
    CityDistrictTownDeletePopupComponent,
    CityDistrictTownDeleteDialogComponent,
    cityDistrictTownRoute,
    cityDistrictTownPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cityDistrictTownRoute,
    ...cityDistrictTownPopupRoute,
];

@NgModule({
    imports: [
        Smartfca001SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CityDistrictTownComponent,
        CityDistrictTownDetailComponent,
        CityDistrictTownDialogComponent,
        CityDistrictTownDeleteDialogComponent,
        CityDistrictTownPopupComponent,
        CityDistrictTownDeletePopupComponent,
    ],
    entryComponents: [
        CityDistrictTownComponent,
        CityDistrictTownDialogComponent,
        CityDistrictTownPopupComponent,
        CityDistrictTownDeleteDialogComponent,
        CityDistrictTownDeletePopupComponent,
    ],
    providers: [
        CityDistrictTownService,
        CityDistrictTownPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001CityDistrictTownModule {}
