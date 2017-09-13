import { BaseEntity } from './../../shared';

export class ContactType implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public description?: string,
        public contactInfos?: BaseEntity[],
    ) {
    }
}
