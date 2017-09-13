import { BaseEntity } from './../../shared';

export class AreaType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public areaNames?: BaseEntity[],
    ) {
    }
}
