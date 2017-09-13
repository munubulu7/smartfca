import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PoliceStationComponent } from './police-station.component';
import { PoliceStationDetailComponent } from './police-station-detail.component';
import { PoliceStationPopupComponent } from './police-station-dialog.component';
import { PoliceStationDeletePopupComponent } from './police-station-delete-dialog.component';

import { Principal } from '../../shared';

export const policeStationRoute: Routes = [
    {
        path: 'police-station',
        component: PoliceStationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PoliceStations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'police-station/:id',
        component: PoliceStationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PoliceStations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const policeStationPopupRoute: Routes = [
    {
        path: 'police-station-new',
        component: PoliceStationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PoliceStations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'police-station/:id/edit',
        component: PoliceStationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PoliceStations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'police-station/:id/delete',
        component: PoliceStationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PoliceStations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
