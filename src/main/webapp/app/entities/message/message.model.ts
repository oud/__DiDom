import { Freelancer } from '../freelancer';
import { Client } from '../client';
import { Proposal } from '../proposal';
import { ProposalStatusCatalog } from '../proposal-status-catalog';
import { Attachment } from '../attachment';
export class Message {
    constructor(
        public id?: number,
        public messageTime?: any,
        public messageText?: string,
        public freelancer?: Freelancer,
        public client?: Client,
        public proposal?: Proposal,
        public proposalStatusCatalog?: ProposalStatusCatalog,
        public attachment?: Attachment,
    ) {
    }
}
