import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class DateFieldController implements NgbDateStruct{
    year: number;
    month: number;
    day: number;

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}
