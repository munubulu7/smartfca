import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PincodeComponent } from './pincode.component';
import { PincodeDetailComponent } from './pincode-detail.component';
import { PincodePopupComponent } from './pincode-dialog.component';
import { PincodeDeletePopupComponent } from './pincode-delete-dialog.component';

import { Principal } from '../../shared';

export const pincodeRoute: Routes = [
    {
        path: 'pincode',
        component: PincodeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pincodes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pincode/:id',
        component: PincodeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pincodes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pincodePopupRoute: Routes = [
    {
        path: 'pincode-new',
        component: PincodePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pincodes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pincode/:id/edit',
        component: PincodePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pincodes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pincode/:id/delete',
        component: PincodeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pincodes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
