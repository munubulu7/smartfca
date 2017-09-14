import {BaseEntity} from "../../shared/model/base-entity";
import {Person} from "../person/person.model";
import {ContactInfo} from "../contact-info/contact-info.model";

export class CrmContactPerson {
    constructor(public id?: number,
                public basicInformation?: BaseEntity,
                public designation?: BaseEntity,
                public persons?: Person,
                public contactInfoList?: ContactInfo[],
                ) {
    }

}
