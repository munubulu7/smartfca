import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AddressInformationComponent } from './address-information.component';
import { AddressInformationDetailComponent } from './address-information-detail.component';
import { AddressInformationPopupComponent } from './address-information-dialog.component';
import { AddressInformationDeletePopupComponent } from './address-information-delete-dialog.component';

import { Principal } from '../../shared';

export const addressInformationRoute: Routes = [
    {
        path: 'address-information',
        component: AddressInformationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressInformations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'address-information/:id',
        component: AddressInformationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressInformations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressInformationPopupRoute: Routes = [
    {
        path: 'address-information-new',
        component: AddressInformationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressInformations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-information/:id/edit',
        component: AddressInformationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressInformations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-information/:id/delete',
        component: AddressInformationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressInformations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
