import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EmployersComponent } from './employers.component';
import { EmployersDetailComponent } from './employers-detail.component';
import { EmployersPopupComponent } from './employers-dialog.component';
import { EmployersDeletePopupComponent } from './employers-delete-dialog.component';

import { Principal } from '../../shared';

export const employersRoute: Routes = [
    {
        path: 'employers',
        component: EmployersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Employers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employers/:id',
        component: EmployersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Employers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employersPopupRoute: Routes = [
    {
        path: 'employers-new',
        component: EmployersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Employers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employers/:id/edit',
        component: EmployersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Employers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employers/:id/delete',
        component: EmployersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Employers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
