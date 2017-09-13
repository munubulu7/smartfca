import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistrationTypeComponent } from './registration-type.component';
import { RegistrationTypeDetailComponent } from './registration-type-detail.component';
import { RegistrationTypePopupComponent } from './registration-type-dialog.component';
import { RegistrationTypeDeletePopupComponent } from './registration-type-delete-dialog.component';

import { Principal } from '../../shared';

export const registrationTypeRoute: Routes = [
    {
        path: 'registration-type',
        component: RegistrationTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'registration-type/:id',
        component: RegistrationTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const registrationTypePopupRoute: Routes = [
    {
        path: 'registration-type-new',
        component: RegistrationTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registration-type/:id/edit',
        component: RegistrationTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registration-type/:id/delete',
        component: RegistrationTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
