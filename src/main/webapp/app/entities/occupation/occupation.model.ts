import { BaseEntity } from './../../shared';

export class Occupation implements BaseEntity {
    constructor(
        public id?: number,
        public occupation?: string,
        public description?: string,
        public employers?: BaseEntity[],
        public basicInfos?: BaseEntity[],
    ) {
    }
}
