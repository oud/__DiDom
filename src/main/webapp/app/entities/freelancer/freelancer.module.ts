import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiDomSharedModule } from '../../shared';
import { DiDomAdminModule } from '../../admin/admin.module';
import {
    FreelancerService,
    FreelancerPopupService,
    FreelancerComponent,
    FreelancerDetailComponent,
    FreelancerDialogComponent,
    FreelancerPopupComponent,
    FreelancerDeletePopupComponent,
    FreelancerDeleteDialogComponent,
    freelancerRoute,
    freelancerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...freelancerRoute,
    ...freelancerPopupRoute,
];

@NgModule({
    imports: [
        DiDomSharedModule,
        DiDomAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FreelancerComponent,
        FreelancerDetailComponent,
        FreelancerDialogComponent,
        FreelancerDeleteDialogComponent,
        FreelancerPopupComponent,
        FreelancerDeletePopupComponent,
    ],
    entryComponents: [
        FreelancerComponent,
        FreelancerDialogComponent,
        FreelancerPopupComponent,
        FreelancerDeleteDialogComponent,
        FreelancerDeletePopupComponent,
    ],
    providers: [
        FreelancerService,
        FreelancerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiDomFreelancerModule {}
