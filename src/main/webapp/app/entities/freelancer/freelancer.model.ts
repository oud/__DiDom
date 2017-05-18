import { User } from '../../shared';
import { Location } from '../location';
import { Skill } from '../skill';
import { Contract } from '../contract';
import { Proposal } from '../proposal';
import { Message } from '../message';
export class Freelancer {
    constructor(
        public id?: number,
        public overiew?: string,
        public user?: User,
        public address?: Location,
        public skill?: Skill,
        public contract?: Contract,
        public proposal?: Proposal,
        public message?: Message,
    ) {
    }
}
