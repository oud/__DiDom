import { Job } from '../job';
import { Contract } from '../contract';
import { Proposal } from '../proposal';
export class PaymentType {
    constructor(
        public id?: number,
        public typeName?: string,
        public job?: Job,
        public contract?: Contract,
        public proposal?: Proposal,
    ) {
    }
}
