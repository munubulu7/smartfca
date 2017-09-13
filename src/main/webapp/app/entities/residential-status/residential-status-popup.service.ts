import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResidentialStatus } from './residential-status.model';
import { ResidentialStatusService } from './residential-status.service';

@Injectable()
export class ResidentialStatusPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private residentialStatusService: ResidentialStatusService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.residentialStatusService.find(id).subscribe((residentialStatus) => {
                this.residentialStatusModalRef(component, residentialStatus);
            });
        } else {
            return this.residentialStatusModalRef(component, new ResidentialStatus());
        }
    }

    residentialStatusModalRef(component: Component, residentialStatus: ResidentialStatus): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.residentialStatus = residentialStatus;
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
