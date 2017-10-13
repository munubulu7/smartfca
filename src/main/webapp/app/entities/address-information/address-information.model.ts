import { BaseEntity } from './../../shared';
import {AddressFor} from "../address-for/address-for.model";

export class AddressInformation implements BaseEntity {
    constructor(
        public id?: number,
        public landmark?: string,
        public registrationInformation?: BaseEntity,
        public addressType?: BaseEntity,
        public addressFor?: BaseEntity,
        public pincode?: BaseEntity,
        public addressFors?: AddressFor[],
    ) {
    }
}
