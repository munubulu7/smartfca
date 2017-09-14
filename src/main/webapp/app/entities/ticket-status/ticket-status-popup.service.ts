import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TicketStatus } from './ticket-status.model';
import { TicketStatusService } from './ticket-status.service';

@Injectable()
export class TicketStatusPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ticketStatusService: TicketStatusService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.ticketStatusService.find(id).subscribe((ticketStatus) => {
                this.ticketStatusModalRef(component, ticketStatus);
            });
        } else {
            return this.ticketStatusModalRef(component, new TicketStatus());
        }
    }

    ticketStatusModalRef(component: Component, ticketStatus: TicketStatus): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ticketStatus = ticketStatus;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
