import { BaseEntity } from './../../shared';

export class PostOffice implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public policeStation?: BaseEntity,
        public premisesBuildingVillages?: BaseEntity[],
    ) {
    }
}
