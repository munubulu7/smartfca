import {Component, OnInit} from "@angular/core";
import {Ticket} from "../ticket/ticket.model";
import {CrmService} from "./crm.service";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {JhiAlertService} from "ng-jhipster";
import {TicketStatus} from "../ticket-status/ticket-status.model";
import {TicketStatusService} from "../ticket-status/ticket-status.service";

@Component({
    selector: 'tickets',
    templateUrl: './ticket.component.html',
})
export class TicketComponent implements OnInit {
    tickets: Ticket[];
    ticketStatusList: TicketStatus[];
    selectedTicketStatusId: String = '0';

    constructor(private alertService: JhiAlertService,
                private ticketStatusService: TicketStatusService,
                private crmService: CrmService) {
    }

    ngOnInit(): void {
        this.crmService.getAllTickets('0', '20', this.selectedTicketStatusId).subscribe(
            (res: ResponseWrapper) => {
                this.tickets = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.ticketStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ticketStatusList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    populateTicketList() {
        this.crmService.getAllTickets('0', '20', this.selectedTicketStatusId).subscribe(
            (res: ResponseWrapper) => {
                this.tickets = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
}
