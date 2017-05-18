
const enum Duration {
    'HOUR',
    'DAY',
    'MONTH'

};

const enum Complexity {
    'EASY',
    'INTERMEDIATE',
    'HARD'

};
import { Skill } from '../skill';
import { PaymentType } from '../payment-type';
import { Client } from '../client';
import { Proposal } from '../proposal';
export class Job {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public paymentAmont?: number,
        public expectedDuration?: Duration,
        public complexity?: Complexity,
        public mainSkill?: Skill,
        public paymentType?: PaymentType,
        public client?: Client,
        public proposal?: Proposal,
    ) {
    }
}
