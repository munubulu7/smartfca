import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SectorComponent } from './sector.component';
import { SectorDetailComponent } from './sector-detail.component';
import { SectorPopupComponent } from './sector-dialog.component';
import { SectorDeletePopupComponent } from './sector-delete-dialog.component';

import { Principal } from '../../shared';

export const sectorRoute: Routes = [
    {
        path: 'sector',
        component: SectorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sector/:id',
        component: SectorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sectorPopupRoute: Routes = [
    {
        path: 'sector-new',
        component: SectorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sector/:id/edit',
        component: SectorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sector/:id/delete',
        component: SectorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
