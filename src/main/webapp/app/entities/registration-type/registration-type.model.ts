import { BaseEntity } from './../../shared';

export class RegistrationType implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public drscription?: string,
        public regInfos?: BaseEntity[],
    ) {
    }
}
