import { Client } from '../client';
import { Freelancer } from '../freelancer';
import { Proposal } from '../proposal';
import { PaymentType } from '../payment-type';
export class Contract {
    constructor(
        public id?: number,
        public startTime?: any,
        public endTime?: any,
        public paymentAmount?: number,
        public client?: Client,
        public freelancer?: Freelancer,
        public proposal?: Proposal,
        public paymentType?: PaymentType,
    ) {
    }
}
