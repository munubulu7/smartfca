import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ContactPersonComponent } from './contact-person.component';
import { ContactPersonDetailComponent } from './contact-person-detail.component';
import { ContactPersonPopupComponent } from './contact-person-dialog.component';
import { ContactPersonDeletePopupComponent } from './contact-person-delete-dialog.component';

import { Principal } from '../../shared';

export const contactPersonRoute: Routes = [
    {
        path: 'contact-person',
        component: ContactPersonComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactPeople'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contact-person/:id',
        component: ContactPersonDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactPeople'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPersonPopupRoute: Routes = [
    {
        path: 'contact-person-new',
        component: ContactPersonPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactPeople'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-person/:id/edit',
        component: ContactPersonPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactPeople'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact-person/:id/delete',
        component: ContactPersonDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactPeople'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
