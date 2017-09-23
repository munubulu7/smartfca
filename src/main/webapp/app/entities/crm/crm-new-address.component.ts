import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {CrmService} from "./crm.service";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {State} from "../state/state.model";
import {CityDistrictTown} from "../city-district-town/city-district-town.model";
import {AreaType} from "../area-type/area-type.model";
import {AreaName} from "../area-name/area-name.model";
import {PoliceStation} from "../police-station/police-station.model";
import {PostOffice} from "../post-office/post-office.model";
import {PremisesBuildingVillage} from "../premises-building-village/premises-building-village.model";
import {Pincode} from "../pincode/pincode.model";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {AddressInformation} from "../address-information/address-information.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressInformationService} from "../address-information/address-information.service";
import {RegistrationInformation} from "../registration-information/registration-information.model";
import {AddressType} from "../address-type/address-type.model";
import {AddressTypeService} from "../address-type/address-type.service";

@Component({
    selector: 'crm-new-address',
    templateUrl: './crm-new-address.component.html',
    styleUrls: [
        '../../../resources/css/font-awesome.min.css',
        '../../../resources/css/bootstrap.css',
        '../../../resources/css/responsive.css'
    ]
})
export class CrmNewAddressComponent implements OnInit, OnDestroy {


    @Input() addressInfo: AddressInformation;

    selectedState: State;
    selectedDistrict: CityDistrictTown;
    selectedAreaType: AreaType;
    selectedAreaName: AreaName;
    selectedPoliceStation: PoliceStation;
    selectedPostOffice: PostOffice;
    selectedVillage: PremisesBuildingVillage;
    stateList: State[];
    districtList: CityDistrictTown[];
    areaTypeList: AreaType[];
    addressTypeList: AddressType[];
    areaList: AreaName[];
    policeStationList: PoliceStation[];
    postOfficeList: PostOffice[];
    villageList: PremisesBuildingVillage[];
    pincodeList: Pincode[];
    routeSub: any;

    constructor(private alertService: JhiAlertService,
                private route: ActivatedRoute,
                private router: Router,
                private eventManager: JhiEventManager,
                private addressInformationService: AddressInformationService,
                private addressTypeService: AddressTypeService,
                private crmService: CrmService) {
    }

    ngOnInit(): void {
        if(!this.addressInfo){
            this.addressInfo = new AddressInformation;
        }
        this.addressTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.addressTypeList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressInformationService.find(params['id']).subscribe(
                    (res: ResponseWrapper) => {
                        this.addressInfo = res;
                    },
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            } else {
                this.addressInfo = new AddressInformation;
            }
        });
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

    submit(){
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressInformationService.update(this.addressInfo).subscribe(
                    (res: AddressInformation) => {
                        this.eventManager.broadcast({name: 'addressInformationListModification', content: 'OK'});
                        this.router.navigateByUrl('/crm-address/'+res.registrationInformation.id);
                    },
                    (res: Response) => {
                        try {
                            res.json();
                        } catch (exception) {
                            this.onError(exception.text);
                        }

                    }
                );
            } else {
                this.addressInfo.registrationInformation = new RegistrationInformation(params['regId']);
                this.addressInformationService.create(this.addressInfo).subscribe(
                    (res: AddressInformation) => {
                        this.eventManager.broadcast({name: 'addressInformationListModification', content: 'OK'});
                        this.router.navigateByUrl('/crm-address/'+params['regId']);
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
        });
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
