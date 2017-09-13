import { BaseEntity } from './../../shared';

export class Person implements BaseEntity {
    constructor(
        public id?: number,
        public fName?: string,
        public mName?: string,
        public lName?: string,
        public salutation?: BaseEntity,
    ) {
    }
}
