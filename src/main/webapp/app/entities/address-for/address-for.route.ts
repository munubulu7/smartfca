import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AddressForComponent } from './address-for.component';
import { AddressForDetailComponent } from './address-for-detail.component';
import { AddressForPopupComponent } from './address-for-dialog.component';
import { AddressForDeletePopupComponent } from './address-for-delete-dialog.component';

import { Principal } from '../../shared';

export const addressForRoute: Routes = [
    {
        path: 'address-for',
        component: AddressForComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressFors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'address-for/:id',
        component: AddressForDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressFors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressForPopupRoute: Routes = [
    {
        path: 'address-for-new',
        component: AddressForPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressFors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-for/:id/edit',
        component: AddressForPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressFors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-for/:id/delete',
        component: AddressForDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressFors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
