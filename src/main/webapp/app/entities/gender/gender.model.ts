import { BaseEntity } from './../../shared';

export class Gender implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public basicInfos?: BaseEntity[],
    ) {
    }
}
