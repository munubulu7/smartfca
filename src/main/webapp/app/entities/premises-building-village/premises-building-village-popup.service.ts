import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PremisesBuildingVillage } from './premises-building-village.model';
import { PremisesBuildingVillageService } from './premises-building-village.service';

@Injectable()
export class PremisesBuildingVillagePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private premisesBuildingVillageService: PremisesBuildingVillageService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.premisesBuildingVillageService.find(id).subscribe((premisesBuildingVillage) => {
                this.premisesBuildingVillageModalRef(component, premisesBuildingVillage);
            });
        } else {
            return this.premisesBuildingVillageModalRef(component, new PremisesBuildingVillage());
        }
    }

    premisesBuildingVillageModalRef(component: Component, premisesBuildingVillage: PremisesBuildingVillage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.premisesBuildingVillage = premisesBuildingVillage;
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
