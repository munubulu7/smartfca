import { BaseEntity } from './../../shared';

export class PremisesBuildingVillage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public postOffice?: BaseEntity,
        public pincodes?: BaseEntity[],
    ) {
    }
}
