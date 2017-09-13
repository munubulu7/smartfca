import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AreaNameComponent } from './area-name.component';
import { AreaNameDetailComponent } from './area-name-detail.component';
import { AreaNamePopupComponent } from './area-name-dialog.component';
import { AreaNameDeletePopupComponent } from './area-name-delete-dialog.component';

import { Principal } from '../../shared';

export const areaNameRoute: Routes = [
    {
        path: 'area-name',
        component: AreaNameComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaNames'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'area-name/:id',
        component: AreaNameDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaNames'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const areaNamePopupRoute: Routes = [
    {
        path: 'area-name-new',
        component: AreaNamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaNames'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-name/:id/edit',
        component: AreaNamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaNames'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-name/:id/delete',
        component: AreaNameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaNames'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
