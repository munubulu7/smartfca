import { BaseEntity } from './../../shared';

export class Sector implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public basicInfos?: BaseEntity[],
    ) {
    }
}
