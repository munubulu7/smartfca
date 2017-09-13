import { BaseEntity } from './../../shared';

export class ResidentialStatus implements BaseEntity {
    constructor(
        public id?: number,
        public status?: string,
        public basicInfos?: BaseEntity[],
    ) {
    }
}
