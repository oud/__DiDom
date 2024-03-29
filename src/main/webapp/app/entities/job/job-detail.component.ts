import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Job } from './job.model';
import { JobService } from './job.service';

@Component({
    selector: 'jhi-job-detail',
    templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit, OnDestroy {

    job: Job;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private jobService: JobService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['job', 'duration', 'complexity']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobs();
    }

    load(id) {
        this.jobService.find(id).subscribe((job) => {
            this.job = job;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobs() {
        this.eventSubscriber = this.eventManager.subscribe('jobListModification', (response) => this.load(this.job.id));
    }
}
