import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RegistrationInformation } from './registration-information.model';
import { RegistrationInformationService } from './registration-information.service';

@Injectable()
export class RegistrationInformationPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private registrationInformationService: RegistrationInformationService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.registrationInformationService.find(id).subscribe((registrationInformation) => {
                registrationInformation.registrationDate = this.datePipe
                    .transform(registrationInformation.registrationDate, 'yyyy-MM-ddThh:mm');
                this.registrationInformationModalRef(component, registrationInformation);
            });
        } else {
            return this.registrationInformationModalRef(component, new RegistrationInformation());
        }
    }

    registrationInformationModalRef(component: Component, registrationInformation: RegistrationInformation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.registrationInformation = registrationInformation;
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
