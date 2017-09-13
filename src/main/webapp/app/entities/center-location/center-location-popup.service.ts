import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CenterLocation } from './center-location.model';
import { CenterLocationService } from './center-location.service';

@Injectable()
export class CenterLocationPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private centerLocationService: CenterLocationService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.centerLocationService.find(id).subscribe((centerLocation) => {
                this.centerLocationModalRef(component, centerLocation);
            });
        } else {
            return this.centerLocationModalRef(component, new CenterLocation());
        }
    }

    centerLocationModalRef(component: Component, centerLocation: CenterLocation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.centerLocation = centerLocation;
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
