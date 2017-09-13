import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SalutationComponent } from './salutation.component';
import { SalutationDetailComponent } from './salutation-detail.component';
import { SalutationPopupComponent } from './salutation-dialog.component';
import { SalutationDeletePopupComponent } from './salutation-delete-dialog.component';

import { Principal } from '../../shared';

export const salutationRoute: Routes = [
    {
        path: 'salutation',
        component: SalutationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salutations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'salutation/:id',
        component: SalutationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salutations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salutationPopupRoute: Routes = [
    {
        path: 'salutation-new',
        component: SalutationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salutations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salutation/:id/edit',
        component: SalutationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salutations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salutation/:id/delete',
        component: SalutationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salutations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
