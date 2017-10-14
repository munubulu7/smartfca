import { BaseEntity } from './../../shared';
import {AddressFor} from "../address-for/address-for.model";
import {AddressType} from "../address-type/address-type.model";

export class AddressInformation implements BaseEntity {
    constructor(
        public id?: number,
        public landmark?: string,
        public registrationInformation?: BaseEntity,
        public addressType?: AddressType,
        public addressFor?: BaseEntity,
        public pincode?: BaseEntity,
        public addressFors?: AddressFor[],
    ) {
    }
}
