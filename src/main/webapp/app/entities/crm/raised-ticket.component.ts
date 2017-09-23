import {Component, OnInit} from "@angular/core";
import {Ticket} from "../ticket/ticket.model";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {RegistrationInformation} from "../registration-information/registration-information.model";
import {RegistrationInformationService} from "../registration-information/registration-information.service";
import {TicketStatus} from "../ticket-status/ticket-status.model";
import {TicketStatusService} from "../ticket-status/ticket-status.service";
import {TicketService} from "../ticket/ticket.service";
import {CrmService} from "./crm.service";

@Component({
    selector: 'new-ticket',
    templateUrl: './raised-ticket.component.html',
    styleUrls: [
        '../../../resources/css/font-awesome.min.css',
        '../../../resources/css/bootstrap.css',
        '../../../resources/css/responsive.css'
    ]
})
export class RaisedTicketComponent implements OnInit {
    ticket: Ticket;
    registrationInformationList: RegistrationInformation[];
    ticketStatusList: TicketStatus[];

    constructor(private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private crmService: CrmService,
                private registrationInformationService: RegistrationInformationService,
                private ticketService: TicketService,
                private ticketStatusService: TicketStatusService) {
    }

    private reset(): void {
        this.ticket = new Ticket();

        this.crmService.getCurrentDateTime().subscribe(
            (res: string) => {
                this.ticket.createdDate = res;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.generateTicketNumber();
    }

    ngOnInit(): void {
        this.reset();
        this.registrationInformationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.registrationInformationList = res.json;
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

    generateTicketNumber() {
        this.crmService.genarateTicketNumber().subscribe(
            (res: string) => {
                this.ticket.ticketNo = res;
            },
            (res: ResponseWrapper) => {
                (res: ResponseWrapper) => this.onError(res.json);
            }
        );
    }

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    createTicket() {
        this.ticketService.create(this.ticket).subscribe(
            (res: Ticket) => {
                this.eventManager.broadcast({name: 'ticketListModification', content: 'OK'});
                this.reset();
            }
            , (res: Response) => {
                try {
                    res.json();
                } catch (exception) {
                    this.onError(exception.text);
                }
            });
    }
}
