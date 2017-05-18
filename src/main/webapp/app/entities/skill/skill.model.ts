import { Job } from '../job';
import { Freelancer } from '../freelancer';
export class Skill {
    constructor(
        public id?: number,
        public skillName?: string,
        public job?: Job,
        public freelancer?: Freelancer,
    ) {
    }
}
