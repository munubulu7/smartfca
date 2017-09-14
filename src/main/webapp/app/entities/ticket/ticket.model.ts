import { BaseEntity } from './../../shared';

export class Ticket implements BaseEntity {
    constructor(
        public id?: number,
        public ticketNo?: string,
        public title?: string,
        public description?: string,
        public note?: string,
        public createdDate?: any,
        public resolvDate?: any,
        public registrationInformation?: BaseEntity,
        public ticketStatus?: BaseEntity,
    ) {
    }
}
