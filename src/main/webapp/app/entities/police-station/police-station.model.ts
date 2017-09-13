import { BaseEntity } from './../../shared';

export class PoliceStation implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public areaName?: BaseEntity,
        public postOffices?: BaseEntity[],
    ) {
    }
}
