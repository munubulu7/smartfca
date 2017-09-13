import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OrganisationTypeComponent } from './organisation-type.component';
import { OrganisationTypeDetailComponent } from './organisation-type-detail.component';
import { OrganisationTypePopupComponent } from './organisation-type-dialog.component';
import { OrganisationTypeDeletePopupComponent } from './organisation-type-delete-dialog.component';

import { Principal } from '../../shared';

export const organisationTypeRoute: Routes = [
    {
        path: 'organisation-type',
        component: OrganisationTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organisation-type/:id',
        component: OrganisationTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organisationTypePopupRoute: Routes = [
    {
        path: 'organisation-type-new',
        component: OrganisationTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-type/:id/edit',
        component: OrganisationTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-type/:id/delete',
        component: OrganisationTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
