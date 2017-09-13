import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CityDistrictTownComponent } from './city-district-town.component';
import { CityDistrictTownDetailComponent } from './city-district-town-detail.component';
import { CityDistrictTownPopupComponent } from './city-district-town-dialog.component';
import { CityDistrictTownDeletePopupComponent } from './city-district-town-delete-dialog.component';

import { Principal } from '../../shared';

export const cityDistrictTownRoute: Routes = [
    {
        path: 'city-district-town',
        component: CityDistrictTownComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityDistrictTowns'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'city-district-town/:id',
        component: CityDistrictTownDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityDistrictTowns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cityDistrictTownPopupRoute: Routes = [
    {
        path: 'city-district-town-new',
        component: CityDistrictTownPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityDistrictTowns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city-district-town/:id/edit',
        component: CityDistrictTownPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityDistrictTowns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city-district-town/:id/delete',
        component: CityDistrictTownDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CityDistrictTowns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
