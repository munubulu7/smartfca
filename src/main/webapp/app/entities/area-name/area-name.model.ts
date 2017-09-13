import { BaseEntity } from './../../shared';

export class AreaName implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public cityDistrictTown?: BaseEntity,
        public policeStations?: BaseEntity[],
        public areaType?: BaseEntity,
    ) {
    }
}
