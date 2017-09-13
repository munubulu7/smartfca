import { BaseEntity } from './../../shared';

export class ContactPerson implements BaseEntity {
    constructor(
        public id?: number,
        public basicInformation?: BaseEntity,
        public designation?: BaseEntity,
        public persons?: BaseEntity,
        public contactInfos?: BaseEntity[],
    ) {
    }
}
