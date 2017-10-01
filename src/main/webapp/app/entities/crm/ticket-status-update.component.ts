import {Component, OnDestroy, OnInit} from "@angular/core";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ActivatedRoute} from "@angular/router";
import {TicketService} from "../ticket/ticket.service";
import {Ticket} from "../ticket/ticket.model";
import {TicketStatus} from "../ticket-status/ticket-status.model";
import {TicketStatusService} from "../ticket-status/ticket-status.service";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {DatePipe} from "@angular/common";
import {CrmService} from "./crm.service";

@Component({
    selector: 'ticket-status-update',
    templateUrl: 'ticket-status-update.component.html'
})
export class TicketStatusUpdateComponent implements OnInit, OnDestroy {
    routeSub: any;
    ticket: Ticket = new Ticket;
    ticketStatusList: TicketStatus[];

    constructor(private alertService: JhiAlertService,
                private datePipe: DatePipe,
                private route: ActivatedRoute,
                private ticketService: TicketService,
                private crmService: CrmService,
                private eventManager: JhiEventManager,
                private ticketStatusService: TicketStatusService) {
    }


    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ticketService.find(params['id']).subscribe((ticket: Ticket) => {
                    ticket.createdDate = this.datePipe
                        .transform(ticket.createdDate, 'yyyy-MM-ddThh:mm');
                    ticket.resolvDate = this.datePipe
                        .transform(ticket.resolvDate, 'yyyy-MM-ddThh:mm');
                    this.ticket = ticket;
                },
                (res: ResponseWrapper) => this.onError(res.json));
        });
        this.ticketStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ticketStatusList = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    previousState() {
        window.history.back();
    }

    updateTicket() {
        if (this.ticket.ticketStatus.status == 'Resolved') {
            this.crmService.getCurrentDateTime().subscribe((dateTime: string) => {
                this.ticket.resolvDate = dateTime;
                this.ticketService.update(this.ticket).subscribe(
                    (res: Ticket) => {
                        this.eventManager.broadcast({name: 'ticketListModification', content: 'OK'});
                    }
                    , (res: Response) => {
                        try {
                            res.json();
                        } catch (exception) {
                            this.onError(exception.text);
                        }
                    });
            }, (res: Response) => {
                try {
                    res.json();
                } catch (exception) {
                    this.onError(exception.text);
                }
            });
        } else {
            this.ticketService.update(this.ticket).subscribe(
                (res: Ticket) => {
                    this.eventManager.broadcast({name: 'ticketListModification', content: 'OK'});
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

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
