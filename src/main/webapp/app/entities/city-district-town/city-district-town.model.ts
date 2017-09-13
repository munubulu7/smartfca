import { BaseEntity } from './../../shared';

export class CityDistrictTown implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public state?: BaseEntity,
        public areaNames?: BaseEntity[],
    ) {
    }
}
