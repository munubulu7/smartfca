import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CityDistrictTown } from './city-district-town.model';
import { CityDistrictTownService } from './city-district-town.service';

@Injectable()
export class CityDistrictTownPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cityDistrictTownService: CityDistrictTownService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.cityDistrictTownService.find(id).subscribe((cityDistrictTown) => {
                this.cityDistrictTownModalRef(component, cityDistrictTown);
            });
        } else {
            return this.cityDistrictTownModalRef(component, new CityDistrictTown());
        }
    }

    cityDistrictTownModalRef(component: Component, cityDistrictTown: CityDistrictTown): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cityDistrictTown = cityDistrictTown;
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
