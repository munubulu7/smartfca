import { BaseEntity } from './../../shared';

export class Salutation implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public persons?: BaseEntity[],
    ) {
    }
}
