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
import {Principal} from "../../shared/auth/principal.service";
import {User} from "../../shared/user/user.model";
import {Observable} from "rxjs/Observable";

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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
    userList: Account[];
    account: Account;

    formatter = (x: {mobileNumber: string}) => x.mobileNumber;

    constructor(private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private crmService: CrmService,
                private registrationInformationService: RegistrationInformationService,
                private ticketService: TicketService,
                private ticketStatusService: TicketStatusService,
                private principal: Principal) {
    }


    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .map(term => term === '' ? []
                : this.registrationInformationList.filter(v => v.mobileNumber.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

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
        this.crmService.getAllUSers().subscribe(
            (res: ResponseWrapper) => {
                this.userList = res.json;
            },
            (res: ResponseWrapper) => {
                (res: ResponseWrapper) => this.onError(res.json);
            }
        );
        this.principal.identity().then((account) => {
            this.account = account;
        });
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
        this.ticket.ticketGenerator = new User(this.account.id);
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
