import { Job } from '../job';
import { Freelancer } from '../freelancer';
import { PaymentType } from '../payment-type';
import { ProposalStatusCatalog } from '../proposal-status-catalog';
import { Contract } from '../contract';
import { Message } from '../message';
export class Proposal {
    constructor(
        public id?: number,
        public proposalTime?: any,
        public paymentAmount?: number,
        public clientGrade?: number,
        public clientComment?: string,
        public freelancerGrade?: number,
        public freelancerComment?: string,
        public job?: Job,
        public freelancer?: Freelancer,
        public paymentType?: PaymentType,
        public currentProposalStatus?: ProposalStatusCatalog,
        public contract?: Contract,
        public message?: Message,
    ) {
    }
}
