import { BaseEntity } from './../../shared';

export class AddressType implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public addressInfos?: BaseEntity[],
    ) {
    }
}
