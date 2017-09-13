import { BaseEntity } from './../../shared';

export class AddressFor implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public addressInfos?: BaseEntity[],
    ) {
    }
}
