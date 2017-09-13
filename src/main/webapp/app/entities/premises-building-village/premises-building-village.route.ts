import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PremisesBuildingVillageComponent } from './premises-building-village.component';
import { PremisesBuildingVillageDetailComponent } from './premises-building-village-detail.component';
import { PremisesBuildingVillagePopupComponent } from './premises-building-village-dialog.component';
import { PremisesBuildingVillageDeletePopupComponent } from './premises-building-village-delete-dialog.component';

import { Principal } from '../../shared';

export const premisesBuildingVillageRoute: Routes = [
    {
        path: 'premises-building-village',
        component: PremisesBuildingVillageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PremisesBuildingVillages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'premises-building-village/:id',
        component: PremisesBuildingVillageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PremisesBuildingVillages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const premisesBuildingVillagePopupRoute: Routes = [
    {
        path: 'premises-building-village-new',
        component: PremisesBuildingVillagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PremisesBuildingVillages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'premises-building-village/:id/edit',
        component: PremisesBuildingVillagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PremisesBuildingVillages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'premises-building-village/:id/delete',
        component: PremisesBuildingVillageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PremisesBuildingVillages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
