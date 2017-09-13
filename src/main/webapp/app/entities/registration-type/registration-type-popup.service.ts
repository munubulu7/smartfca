import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationType } from './registration-type.model';
import { RegistrationTypeService } from './registration-type.service';

@Injectable()
export class RegistrationTypePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private registrationTypeService: RegistrationTypeService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.registrationTypeService.find(id).subscribe((registrationType) => {
                this.registrationTypeModalRef(component, registrationType);
            });
        } else {
            return this.registrationTypeModalRef(component, new RegistrationType());
        }
    }

    registrationTypeModalRef(component: Component, registrationType: RegistrationType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.registrationType = registrationType;
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
