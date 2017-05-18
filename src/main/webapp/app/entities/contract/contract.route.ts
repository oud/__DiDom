import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ContractComponent } from './contract.component';
import { ContractDetailComponent } from './contract-detail.component';
import { ContractPopupComponent } from './contract-dialog.component';
import { ContractDeletePopupComponent } from './contract-delete-dialog.component';

import { Principal } from '../../shared';

export const contractRoute: Routes = [
  {
    path: 'contract',
    component: ContractComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.contract.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'contract/:id',
    component: ContractDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.contract.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const contractPopupRoute: Routes = [
  {
    path: 'contract-new',
    component: ContractPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.contract.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'contract/:id/edit',
    component: ContractPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.contract.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'contract/:id/delete',
    component: ContractDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'diDomApp.contract.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
