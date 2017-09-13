import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OccupationComponent } from './occupation.component';
import { OccupationDetailComponent } from './occupation-detail.component';
import { OccupationPopupComponent } from './occupation-dialog.component';
import { OccupationDeletePopupComponent } from './occupation-delete-dialog.component';

import { Principal } from '../../shared';

export const occupationRoute: Routes = [
    {
        path: 'occupation',
        component: OccupationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Occupations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'occupation/:id',
        component: OccupationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Occupations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const occupationPopupRoute: Routes = [
    {
        path: 'occupation-new',
        component: OccupationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Occupations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'occupation/:id/edit',
        component: OccupationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Occupations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'occupation/:id/delete',
        component: OccupationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Occupations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
