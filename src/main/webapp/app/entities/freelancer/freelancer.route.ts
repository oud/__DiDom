import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { FreelancerComponent } from './freelancer.component';
import { FreelancerDetailComponent } from './freelancer-detail.component';
import { FreelancerPopupComponent } from './freelancer-dialog.component';
import { FreelancerDeletePopupComponent } from './freelancer-delete-dialog.component';

import { Principal } from '../../shared';

export const freelancerRoute: Routes = [
  {
    path: 'freelancer',
    component: FreelancerComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.freelancer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'freelancer/:id',
    component: FreelancerDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.freelancer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const freelancerPopupRoute: Routes = [
  {
    path: 'freelancer-new',
    component: FreelancerPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.freelancer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'freelancer/:id/edit',
    component: FreelancerPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.freelancer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'freelancer/:id/delete',
    component: FreelancerDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.freelancer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
