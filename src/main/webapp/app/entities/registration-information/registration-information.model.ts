import { BaseEntity } from './../../shared';

export class RegistrationInformation implements BaseEntity {
    constructor(
        public id?: number,
        public applicationNumber?: string,
        public registrationDate?: any,
        public accountNumber?: string,
        public mobileNumber?: string,
        public emailId?: string,
        public basicInfos?: BaseEntity[],
        public contactInfos?: BaseEntity[],
        public addressInfos?: BaseEntity[],
        public centerLocation?: BaseEntity,
        public registrationType?: BaseEntity,
    ) {
    }
}
