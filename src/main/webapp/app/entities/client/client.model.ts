import { User } from '../../shared';
import { Job } from '../job';
import { Location } from '../location';
import { Contract } from '../contract';
import { Message } from '../message';
export class Client {
    constructor(
        public id?: number,
        public overview?: string,
        public user?: User,
        public job?: Job,
        public address?: Location,
        public contract?: Contract,
        public message?: Message,
    ) {
    }
}
