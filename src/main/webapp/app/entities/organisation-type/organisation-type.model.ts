import { BaseEntity } from './../../shared';

export class OrganisationType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public basicInfos?: BaseEntity[],
    ) {
    }
}
