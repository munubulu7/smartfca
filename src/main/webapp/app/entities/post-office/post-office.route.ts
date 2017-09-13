import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PostOfficeComponent } from './post-office.component';
import { PostOfficeDetailComponent } from './post-office-detail.component';
import { PostOfficePopupComponent } from './post-office-dialog.component';
import { PostOfficeDeletePopupComponent } from './post-office-delete-dialog.component';

import { Principal } from '../../shared';

export const postOfficeRoute: Routes = [
    {
        path: 'post-office',
        component: PostOfficeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PostOffices'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'post-office/:id',
        component: PostOfficeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PostOffices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const postOfficePopupRoute: Routes = [
    {
        path: 'post-office-new',
        component: PostOfficePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PostOffices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post-office/:id/edit',
        component: PostOfficePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PostOffices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post-office/:id/delete',
        component: PostOfficeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PostOffices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
