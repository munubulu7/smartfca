import { BaseEntity } from './../../shared';

export class CenterLocation implements BaseEntity {
    constructor(
        public id?: number,
        public locationCode?: string,
        public drscription?: string,
        public regInfos?: BaseEntity[],
    ) {
    }
}
