import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Smartfca001RegistrationInformationModule } from './registration-information/registration-information.module';
import { Smartfca001BasicInformationModule } from './basic-information/basic-information.module';
import { Smartfca001AddressInformationModule } from './address-information/address-information.module';
import { Smartfca001CenterLocationModule } from './center-location/center-location.module';
import { Smartfca001RegistrationTypeModule } from './registration-type/registration-type.module';
import { Smartfca001PersonModule } from './person/person.module';
import { Smartfca001SalutationModule } from './salutation/salutation.module';
import { Smartfca001ResidentialStatusModule } from './residential-status/residential-status.module';
import { Smartfca001MaritalStatusModule } from './marital-status/marital-status.module';
import { Smartfca001GenderModule } from './gender/gender.module';
import { Smartfca001OccupationModule } from './occupation/occupation.module';
import { Smartfca001EmployersModule } from './employers/employers.module';
import { Smartfca001OrganisationTypeModule } from './organisation-type/organisation-type.module';
import { Smartfca001SectorModule } from './sector/sector.module';
import { Smartfca001DesignationModule } from './designation/designation.module';
import { Smartfca001ContactTypeModule } from './contact-type/contact-type.module';
import { Smartfca001ContactInfoModule } from './contact-info/contact-info.module';
import { Smartfca001ContactPersonModule } from './contact-person/contact-person.module';
import { Smartfca001AddressTypeModule } from './address-type/address-type.module';
import { Smartfca001AddressForModule } from './address-for/address-for.module';
import { Smartfca001StateModule } from './state/state.module';
import { Smartfca001CityDistrictTownModule } from './city-district-town/city-district-town.module';
import { Smartfca001AreaNameModule } from './area-name/area-name.module';
import { Smartfca001AreaTypeModule } from './area-type/area-type.module';
import { Smartfca001PoliceStationModule } from './police-station/police-station.module';
import { Smartfca001PostOfficeModule } from './post-office/post-office.module';
import { Smartfca001PremisesBuildingVillageModule } from './premises-building-village/premises-building-village.module';
import { Smartfca001PincodeModule } from './pincode/pincode.module';
import {CustomerRelationModule} from "./crm/customer.relation.module";
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Smartfca001RegistrationInformationModule,
        Smartfca001BasicInformationModule,
        Smartfca001AddressInformationModule,
        Smartfca001CenterLocationModule,
        Smartfca001RegistrationTypeModule,
        Smartfca001PersonModule,
        Smartfca001SalutationModule,
        Smartfca001ResidentialStatusModule,
        Smartfca001MaritalStatusModule,
        Smartfca001GenderModule,
        Smartfca001OccupationModule,
        Smartfca001EmployersModule,
        Smartfca001OrganisationTypeModule,
        Smartfca001SectorModule,
        Smartfca001DesignationModule,
        Smartfca001ContactTypeModule,
        Smartfca001ContactInfoModule,
        Smartfca001ContactPersonModule,
        Smartfca001AddressTypeModule,
        Smartfca001AddressForModule,
        Smartfca001StateModule,
        Smartfca001CityDistrictTownModule,
        Smartfca001AreaNameModule,
        Smartfca001AreaTypeModule,
        Smartfca001PoliceStationModule,
        Smartfca001PostOfficeModule,
        Smartfca001PremisesBuildingVillageModule,
        Smartfca001PincodeModule,
        CustomerRelationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Smartfca001EntityModule {}
