import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BasicInformation } from './basic-information.model';
import { BasicInformationService } from './basic-information.service';

@Injectable()
export class BasicInformationPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private basicInformationService: BasicInformationService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.basicInformationService.find(id).subscribe((basicInformation) => {
                if (basicInformation.dateOfBirth) {
                    basicInformation.dateOfBirth = {
                        year: basicInformation.dateOfBirth.getFullYear(),
                        month: basicInformation.dateOfBirth.getMonth() + 1,
                        day: basicInformation.dateOfBirth.getDate()
                    };
                }
                if (basicInformation.yearOfEmployed) {
                    basicInformation.yearOfEmployed = {
                        year: basicInformation.yearOfEmployed.getFullYear(),
                        month: basicInformation.yearOfEmployed.getMonth() + 1,
                        day: basicInformation.yearOfEmployed.getDate()
                    };
                }
                if (basicInformation.establishment) {
                    basicInformation.establishment = {
                        year: basicInformation.establishment.getFullYear(),
                        month: basicInformation.establishment.getMonth() + 1,
                        day: basicInformation.establishment.getDate()
                    };
                }
                if (basicInformation.commencement) {
                    basicInformation.commencement = {
                        year: basicInformation.commencement.getFullYear(),
                        month: basicInformation.commencement.getMonth() + 1,
                        day: basicInformation.commencement.getDate()
                    };
                }
                this.basicInformationModalRef(component, basicInformation);
            });
        } else {
            return this.basicInformationModalRef(component, new BasicInformation());
        }
    }

    basicInformationModalRef(component: Component, basicInformation: BasicInformation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.basicInformation = basicInformation;
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
