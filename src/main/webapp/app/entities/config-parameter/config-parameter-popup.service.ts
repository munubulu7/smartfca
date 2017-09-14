import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfigParameter } from './config-parameter.model';
import { ConfigParameterService } from './config-parameter.service';

@Injectable()
export class ConfigParameterPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private configParameterService: ConfigParameterService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.configParameterService.find(id).subscribe((configParameter) => {
                this.configParameterModalRef(component, configParameter);
            });
        } else {
            return this.configParameterModalRef(component, new ConfigParameter());
        }
    }

    configParameterModalRef(component: Component, configParameter: ConfigParameter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.configParameter = configParameter;
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
