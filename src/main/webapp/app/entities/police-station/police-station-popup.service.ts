import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PoliceStation } from './police-station.model';
import { PoliceStationService } from './police-station.service';

@Injectable()
export class PoliceStationPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private policeStationService: PoliceStationService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.policeStationService.find(id).subscribe((policeStation) => {
                this.policeStationModalRef(component, policeStation);
            });
        } else {
            return this.policeStationModalRef(component, new PoliceStation());
        }
    }

    policeStationModalRef(component: Component, policeStation: PoliceStation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.policeStation = policeStation;
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
