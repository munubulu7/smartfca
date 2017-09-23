import {Component, OnInit} from "@angular/core";
import {CenterLocation} from "../center-location/center-location.model";
import {CrmService} from "./crm.service";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {RegistrationType} from "../registration-type/registration-type.model";
import {RegistrationInformation} from "../registration-information/registration-information.model";
import {BasicInformation} from "../basic-information/basic-information.model";
import {AddressInformation} from "../address-information/address-information.model";
import {RegistrationInformationService} from "../registration-information/registration-information.service";
import {Salutation} from "../salutation/salutation.model";
import {SalutationService} from "../salutation/salutation.service";
import {BasicInformationService} from "../basic-information/basic-information.service";
import {Person} from "../person/person.model";
import {PersonService} from "../person/person.service";
import {ResidentialStatus} from "../residential-status/residential-status.model";
import {Gender} from "../gender/gender.model";
import {MaritalStatus} from "../marital-status/marital-status.model";
import {Occupation} from "../occupation/occupation.model";
import {Sector} from "../sector/sector.model";
import {ResidentialStatusService} from "../residential-status/residential-status.service";
import {GenderService} from "../gender/gender.service";
import {MaritalStatusService} from "../marital-status/marital-status.service";
import {OccupationService} from "../occupation/occupation.service";
import {SectorService} from "../sector/sector.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {DateFieldController} from "./dateFieldController";
import {Employers} from "../employers/employers.model";
import {CrmContactPerson} from "./crm.contactPerson";
import {ContactPersonService} from "../contact-person/contact-person.service";
import {ContactPerson} from "../contact-person/contact-person.model";
import {OrganisationType} from "../organisation-type/organisation-type.model";
import {OrganisationTypeService} from "../organisation-type/organisation-type.service";
import {AddressType} from "../address-type/address-type.model";
import {State} from "../state/state.model";
import {CityDistrictTown} from "../city-district-town/city-district-town.model";
import {AreaType} from "../area-type/area-type.model";
import {AreaName} from "../area-name/area-name.model";
import {PoliceStation} from "../police-station/police-station.model";
import {PostOffice} from "../post-office/post-office.model";
import {PremisesBuildingVillage} from "../premises-building-village/premises-building-village.model";
import {AddressTypeService} from "../address-type/address-type.service";
import {StateService} from "../state/state.service";
import {Pincode} from "../pincode/pincode.model";
import {AreaTypeService} from "../area-type/area-type.service";
import {AddressInformationService} from "../address-information/address-information.service";
import {ContactInfo} from "../contact-info/contact-info.model";
import {ContactInfoService} from "../contact-info/contact-info.service";
import {Router} from "@angular/router";

@Component({
    selector: 'crm-dialog',
    templateUrl: './crm-dialog.component.html',
    styleUrls: [
        '../../../resources/css/font-awesome.min.css',
        '../../../resources/css/bootstrap.css',
        '../../../resources/css/responsive.css'
    ]
})
export class CrmDialogComponent implements OnInit {
    regType: RegistrationType;
    isOpenBasicInfo: string;
    isOpenAddress: string;
    isOpenRegInfo: String;
    isPersonal: boolean;
    regInfo: RegistrationInformation;
    personalBasicInfo: BasicInformation;
    businessBasicInfo: BasicInformation;
    addressInfo: AddressInformation;
    centerLocations: CenterLocation[];
    registrationTypes: RegistrationType[];
    salutations: Salutation[];
    residentialStatuses: ResidentialStatus[];
    genderList: Gender[];
    maritalStatuses: MaritalStatus[];
    occupationList: Occupation[];
    sectorList: Sector[];
    employersList: Employers[];
    organisationTypeList: OrganisationType[];
    addressTypeList: AddressType[];
    stateList: State[];
    districtList: CityDistrictTown[];
    areaTypeList: AreaType[];
    areaList: AreaName[];
    policeStationList: PoliceStation[];
    postOfficeList: PostOffice[];
    villageList: PremisesBuildingVillage[];
    pincodeList: Pincode[];
    name: Person;
    father: Person;
    mother: Person;
    contactPersonFromGroup: CrmContactPerson[] = [];
    selectedState: State;
    selectedDistrict: CityDistrictTown;
    selectedAreaType: AreaType;
    selectedAreaName: AreaName;
    selectedPoliceStation: PoliceStation;
    selectedPostOffice: PostOffice;
    selectedVillage: PremisesBuildingVillage;
    contactInfoList: ContactInfo[] = [];

    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;


    private reset(): void {
        this.isPersonal = true;
        this.regType = 'Personal';
        this.isOpenBasicInfo = '';
        this.isOpenAddress = '';
        this.isOpenRegInfo = 'in'
        this.regInfo = new RegistrationInformation;
        this.personalBasicInfo = new BasicInformation;
        this.businessBasicInfo = new BasicInformation;
        this.addressInfo = new AddressInformation;
        this.name = new Person;
        this.father = new Person;
        this.mother = new Person;
        this.addressInfo = new AddressInformation;
        this.minDate = new DateFieldController(1950, 1, 1);
        this.maxDate = new DateFieldController(2018, 1, 1);
    }

    constructor(private alertService: JhiAlertService,
                private router: Router,
                private crmService: CrmService,
                private eventManager: JhiEventManager,
                private registrationInformationService: RegistrationInformationService,
                private addressInformationService: AddressInformationService,
                private salutationService: SalutationService,
                private basicInformationService: BasicInformationService,
                private residentialStatusService: ResidentialStatusService,
                private genderService: GenderService,
                private maritalStatusService: MaritalStatusService,
                private occupationService: OccupationService,
                private sectorService: SectorService,
                private contactPersonService: ContactPersonService,
                private organisationTypeService: OrganisationTypeService,
                private addressTypeService: AddressTypeService,
                private stateService: StateService,
                private areaTypeService: AreaTypeService,
                private contactInfoService: ContactInfoService,
                private personService: PersonService) {
    }

    ngOnInit(): void {
        this.reset();
        this.crmService.getAllCenterLocations().subscribe(
            (res: ResponseWrapper) => {
                this.centerLocations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json));
        this.crmService.getAllRegistrationType().subscribe(
            (res: ResponseWrapper) => {
                this.registrationTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json));
        this.salutationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.salutations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.residentialStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.residentialStatuses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.genderService.query().subscribe(
            (res: ResponseWrapper) => {
                this.genderList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.maritalStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.maritalStatuses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.occupationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.occupationList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.sectorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sectorList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.organisationTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.organisationTypeList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.addressTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.addressTypeList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.stateService.query().subscribe(
            (res: ResponseWrapper) => {
                this.stateList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.areaTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.areaTypeList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.crmService.getCurrentDateTime().subscribe(
            (res: string) => {
                this.regInfo.registrationDate = res;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }


    onSelectRegType() {
        this.regInfo.registrationType = this.regType;
        if (this.regType.type === 'Personal') {
            this.isPersonal = true;
            this.contactInfoList = [];
            this.contactInfoList.push(new ContactInfo());
        } else {
            this.isPersonal = false;
            this.contactInfoList = [];
        }
    }

    populateEmployers() {
        this.crmService.getEmployersByOccupation(this.personalBasicInfo.occupation.id).subscribe(
            (res: ResponseWrapper) => {
                this.employersList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    saveRegInfo() {
        this.registrationInformationService.create(this.regInfo).subscribe(
            (res: RegistrationInformation) => {
                this.regInfo = res;
                this.contactInfoList.map((value, index) => {
                    value.registrationInformation = this.regInfo;
                    this.contactInfoService.create(value).subscribe(
                        (res: ContactInfo) => {
                            this.eventManager.broadcast({
                                name: 'contactInfoListModification',
                                content: 'OK'
                            });
                        },
                        (res: Response) => {
                            try {
                                res.json();
                            } catch (exception) {
                                this.onError(exception.text);
                            }
                        });
                });
                this.eventManager.broadcast({name: 'registrationInformationListModification', content: 'OK'});
                this.isOpenBasicInfo = 'in';
                this.isOpenAddress = '';
                this.isOpenRegInfo = ''
            },
            (res: Response) => {
                try {
                    res.json();
                } catch (exception) {
                    this.onError(exception.text);
                }
            }
        );
    }

    saveBasicInfo() {
        if (this.isPersonal) {
            this.savePerson(this.name, res => {
                this.personalBasicInfo.name = res;
                this.savePerson(this.father, res => {
                    this.personalBasicInfo.father = res;
                    this.savePerson(this.mother, res => {
                        this.personalBasicInfo.mother = res;
                        this.createBasicInfo(this.personalBasicInfo, res => this.personalBasicInfo = res);
                    });
                });
            });
        } else {
            this.createBasicInfo(this.businessBasicInfo, res => {
                this.businessBasicInfo = res;
                this.contactPersonFromGroup.map((value, index) => {
                    this.savePerson(value.persons, res => {
                        let cnPer = new ContactPerson();
                        cnPer.designation = value.designation;
                        cnPer.persons = res;
                        cnPer.basicInformation = this.businessBasicInfo;
                        this.contactPersonService.create(cnPer).subscribe(
                            cnres => {
                                value.contactInfoList.map(value2 => {
                                    value2.contactPerson = cnres;
                                    this.contactInfoService.create(value2).subscribe(
                                        (res: ContactInfo) => {
                                            this.eventManager.broadcast({
                                                name: 'contactInfoListModification',
                                                content: 'OK'
                                            });
                                        },
                                        (res: Response) => {
                                            try {
                                                res.json();
                                            } catch (exception) {
                                                this.onError(exception.text);
                                            }

                                        }
                                    );
                                });
                                this.eventManager.broadcast({name: 'contactPersonListModification', content: 'OK'});
                            },
                            (res: Response) => {
                                try {
                                    res.json();
                                } catch (exception) {
                                    this.onError(exception.text);
                                }

                            }
                        );
                    });
                });
            });
        }
    }

    createBasicInfo(basicInfo: BasicInformation, callback) {
        basicInfo.registrationInformation = this.regInfo;
        this.basicInformationService.create(basicInfo).subscribe(
            (res: BasicInformation) => {
                this.eventManager.broadcast({name: 'basicInformationListModification', content: 'OK'});
                callback(res);
                this.isOpenBasicInfo = '';
                this.isOpenAddress = 'in';
                this.isOpenRegInfo = ''
            },
            (res: Response) => {
                try {
                    res.json();
                } catch (exception) {
                    this.onError(exception.text);
                }

            }
        );
    }

    savePerson(person: Person, callback) {
        this.personService.create(person).subscribe(
            (res: Person) => {
                callback(res);
                this.eventManager.broadcast({name: 'personListModification', content: 'OK'});
            },
            (res: Response) => {
                try {
                    res.json();
                } catch (exception) {
                    this.onError(exception.text);
                }

            }
        );
    }

    addContactPerson() {
        let sampleContactPerson = new CrmContactPerson;
        sampleContactPerson.persons = new Person;
        sampleContactPerson.contactInfoList = [];
        sampleContactPerson.contactInfoList.push(new ContactInfo);
        this.contactPersonFromGroup.push(sampleContactPerson);
    }

    deleteContactPerson(index: number) {
        this.contactPersonFromGroup.splice(index, 1);
    }

    populateDistrict() {
        this.crmService.getDistrictByState(this.selectedState.id).subscribe(
            (res: ResponseWrapper) => {
                this.districtList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    populateArea() {
        this.crmService.getAreaNameByDistrictAreaType(this.selectedDistrict.id, this.selectedAreaType.id).subscribe(
            (res: ResponseWrapper) => {
                this.areaList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }


    populatePoliceStation() {
        this.crmService.getPoliceStationByAreaName(this.selectedAreaName.id).subscribe(
            (res: ResponseWrapper) => {
                this.policeStationList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    populatePostOffice() {
        this.crmService.getPostByPoliceStation(this.selectedPoliceStation.id).subscribe(
            (res: ResponseWrapper) => {
                this.postOfficeList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    populateVillages() {
        this.crmService.getVillagesByPostOffice(this.selectedPostOffice.id).subscribe(
            (res: ResponseWrapper) => {
                this.villageList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    populatePincode() {
        this.crmService.getPincodeByVillage(this.selectedVillage.id).subscribe(
            (res: ResponseWrapper) => {
                this.pincodeList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    saveAddressInfo() {
        this.addressInfo.registrationInformation = this.regInfo;
        this.addressInformationService.create(this.addressInfo).subscribe(
            (res: Person) => {
                this.eventManager.broadcast({name: 'addressInformationListModification', content: 'OK'});
                this.reset();
                this.router.navigateByUrl('/user');
            },
            (res: Response) => {
                try {
                    res.json();
                } catch (exception) {
                    this.onError(exception.text);
                }

            }
        );
    }
}
