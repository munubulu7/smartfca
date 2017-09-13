import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CenterLocationComponent } from './center-location.component';
import { CenterLocationDetailComponent } from './center-location-detail.component';
import { CenterLocationPopupComponent } from './center-location-dialog.component';
import { CenterLocationDeletePopupComponent } from './center-location-delete-dialog.component';

import { Principal } from '../../shared';

export const centerLocationRoute: Routes = [
    {
        path: 'center-location',
        component: CenterLocationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CenterLocations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'center-location/:id',
        component: CenterLocationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CenterLocations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const centerLocationPopupRoute: Routes = [
    {
        path: 'center-location-new',
        component: CenterLocationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CenterLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'center-location/:id/edit',
        component: CenterLocationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CenterLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'center-location/:id/delete',
        component: CenterLocationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CenterLocations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
