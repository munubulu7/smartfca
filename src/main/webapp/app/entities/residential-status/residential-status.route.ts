import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResidentialStatusComponent } from './residential-status.component';
import { ResidentialStatusDetailComponent } from './residential-status-detail.component';
import { ResidentialStatusPopupComponent } from './residential-status-dialog.component';
import { ResidentialStatusDeletePopupComponent } from './residential-status-delete-dialog.component';

import { Principal } from '../../shared';

export const residentialStatusRoute: Routes = [
    {
        path: 'residential-status',
        component: ResidentialStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResidentialStatuses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'residential-status/:id',
        component: ResidentialStatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResidentialStatuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const residentialStatusPopupRoute: Routes = [
    {
        path: 'residential-status-new',
        component: ResidentialStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResidentialStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'residential-status/:id/edit',
        component: ResidentialStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResidentialStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'residential-status/:id/delete',
        component: ResidentialStatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ResidentialStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
