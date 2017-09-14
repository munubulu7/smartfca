import { BaseEntity } from './../../shared';

export class ConfigParameter implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public value?: string,
    ) {
    }
}
