import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConfigParameterComponent } from './config-parameter.component';
import { ConfigParameterDetailComponent } from './config-parameter-detail.component';
import { ConfigParameterPopupComponent } from './config-parameter-dialog.component';
import { ConfigParameterDeletePopupComponent } from './config-parameter-delete-dialog.component';

import { Principal } from '../../shared';

export const configParameterRoute: Routes = [
    {
        path: 'config-parameter',
        component: ConfigParameterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigParameters'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'config-parameter/:id',
        component: ConfigParameterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigParameters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const configParameterPopupRoute: Routes = [
    {
        path: 'config-parameter-new',
        component: ConfigParameterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigParameters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'config-parameter/:id/edit',
        component: ConfigParameterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigParameters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'config-parameter/:id/delete',
        component: ConfigParameterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfigParameters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
