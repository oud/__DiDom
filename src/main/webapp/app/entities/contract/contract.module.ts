import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiDomSharedModule } from '../../shared';
import {
    ContractService,
    ContractPopupService,
    ContractComponent,
    ContractDetailComponent,
    ContractDialogComponent,
    ContractPopupComponent,
    ContractDeletePopupComponent,
    ContractDeleteDialogComponent,
    contractRoute,
    contractPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contractRoute,
    ...contractPopupRoute,
];

@NgModule({
    imports: [
        DiDomSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ContractComponent,
        ContractDetailComponent,
        ContractDialogComponent,
        ContractDeleteDialogComponent,
        ContractPopupComponent,
        ContractDeletePopupComponent,
    ],
    entryComponents: [
        ContractComponent,
        ContractDialogComponent,
        ContractPopupComponent,
        ContractDeleteDialogComponent,
        ContractDeletePopupComponent,
    ],
    providers: [
        ContractService,
        ContractPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiDomContractModule {}
