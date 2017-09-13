import { BaseEntity } from './../../shared';

export class Pincode implements BaseEntity {
    constructor(
        public id?: number,
        public pincode?: string,
        public premisesBuildingVillage?: BaseEntity,
        public addressInfos?: BaseEntity[],
    ) {
    }
}
