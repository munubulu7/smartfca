import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistrationInformationComponent } from './registration-information.component';
import { RegistrationInformationDetailComponent } from './registration-information-detail.component';
import { RegistrationInformationPopupComponent } from './registration-information-dialog.component';
import { RegistrationInformationDeletePopupComponent } from './registration-information-delete-dialog.component';

import { Principal } from '../../shared';

export const registrationInformationRoute: Routes = [
    {
        path: 'registration-information',
        component: RegistrationInformationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationInformations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'registration-information/:id',
        component: RegistrationInformationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationInformations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const registrationInformationPopupRoute: Routes = [
    {
        path: 'registration-information-new',
        component: RegistrationInformationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationInformations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registration-information/:id/edit',
        component: RegistrationInformationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationInformations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registration-information/:id/delete',
        component: RegistrationInformationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistrationInformations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
