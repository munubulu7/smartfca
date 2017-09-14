import {RegistrationInformation} from "../registration-information/registration-information.model";
import {BasicInformation} from "../basic-information/basic-information.model";
import {AddressInfo} from "dgram";

export class CrmModel {
    constructor(public regInfo: RegistrationInformation,
                public basicInfo: BasicInformation,
                public addressInfo: AddressInfo) {

    }
}
