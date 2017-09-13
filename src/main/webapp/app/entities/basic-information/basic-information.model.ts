import { BaseEntity } from './../../shared';

export class BasicInformation implements BaseEntity {
    constructor(
        public id?: number,
        public dateOfBirth?: any,
        public noOfSon?: number,
        public noOfDaughter?: number,
        public yearOfEmployed?: any,
        public nameOfOrganisation?: string,
        public establishment?: any,
        public commencement?: any,
        public registrationInformation?: BaseEntity,
        public name?: BaseEntity,
        public father?: BaseEntity,
        public mother?: BaseEntity,
        public contactPersons?: BaseEntity[],
        public residentialStatus?: BaseEntity,
        public maritalStatus?: BaseEntity,
        public gender?: BaseEntity,
        public occupation?: BaseEntity,
        public employers?: BaseEntity,
        public organisationType?: BaseEntity,
        public sector?: BaseEntity,
    ) {
    }
}
