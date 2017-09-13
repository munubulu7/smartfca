import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddressInformation } from './address-information.model';
import { AddressInformationService } from './address-information.service';

@Injectable()
export class AddressInformationPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private addressInformationService: AddressInformationService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.addressInformationService.find(id).subscribe((addressInformation) => {
                this.addressInformationModalRef(component, addressInformation);
            });
        } else {
            return this.addressInformationModalRef(component, new AddressInformation());
        }
    }

    addressInformationModalRef(component: Component, addressInformation: AddressInformation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.addressInformation = addressInformation;
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
