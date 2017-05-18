import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DiDomFreelancerModule } from './freelancer/freelancer.module';
import { DiDomClientModule } from './client/client.module';
import { DiDomPaymentTypeModule } from './payment-type/payment-type.module';
import { DiDomSkillModule } from './skill/skill.module';
import { DiDomJobModule } from './job/job.module';
import { DiDomLocationModule } from './location/location.module';
import { DiDomCountryModule } from './country/country.module';
import { DiDomProposalStatusCatalogModule } from './proposal-status-catalog/proposal-status-catalog.module';
import { DiDomProposalModule } from './proposal/proposal.module';
import { DiDomContractModule } from './contract/contract.module';
import { DiDomMessageModule } from './message/message.module';
import { DiDomAttachmentModule } from './attachment/attachment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DiDomFreelancerModule,
        DiDomClientModule,
        DiDomPaymentTypeModule,
        DiDomSkillModule,
        DiDomJobModule,
        DiDomLocationModule,
        DiDomCountryModule,
        DiDomProposalStatusCatalogModule,
        DiDomProposalModule,
        DiDomContractModule,
        DiDomMessageModule,
        DiDomAttachmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiDomEntityModule {}
