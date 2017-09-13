import { BaseEntity } from './../../shared';

export class ContactInfo implements BaseEntity {
    constructor(
        public id?: number,
        public contactDetails?: string,
        public registrationInformation?: BaseEntity,
        public contactType?: BaseEntity,
        public contactPerson?: BaseEntity,
    ) {
    }
}
