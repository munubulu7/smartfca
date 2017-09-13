import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ContactInfoComponent } from './contact-info.component';
import { ContactInfoDetailComponent } from './contact-info-detail.component';
import { ContactInfoPopupComponent } from './contact-info-dialog.component';
import { ContactInfoDeletePopupComponent } from './contact-info-delete-dialog.component';

import { Principal } from '../../shared';

export const contactInfoRoute: Routes = [
    {
        path: 'contact-info',
        component: ContactInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactInfos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contact-info/:id',
        component: ContactInfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactInfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactInfoPopupRoute: Routes = [
    {
        path: 'contact-info-new',
        component: ContactInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-info/:id/edit',
        component: ContactInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-info/:id/delete',
        component: ContactInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
