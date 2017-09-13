import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AreaTypeComponent } from './area-type.component';
import { AreaTypeDetailComponent } from './area-type-detail.component';
import { AreaTypePopupComponent } from './area-type-dialog.component';
import { AreaTypeDeletePopupComponent } from './area-type-delete-dialog.component';

import { Principal } from '../../shared';

export const areaTypeRoute: Routes = [
    {
        path: 'area-type',
        component: AreaTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'area-type/:id',
        component: AreaTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const areaTypePopupRoute: Routes = [
    {
        path: 'area-type-new',
        component: AreaTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-type/:id/edit',
        component: AreaTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-type/:id/delete',
        component: AreaTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AreaTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
