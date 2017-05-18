import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Proposal } from './proposal.model';
import { ProposalPopupService } from './proposal-popup.service';
import { ProposalService } from './proposal.service';
import { Job, JobService } from '../job';
import { Freelancer, FreelancerService } from '../freelancer';
import { PaymentType, PaymentTypeService } from '../payment-type';
import { ProposalStatusCatalog, ProposalStatusCatalogService } from '../proposal-status-catalog';

@Component({
    selector: 'jhi-proposal-dialog',
    templateUrl: './proposal-dialog.component.html'
})
export class ProposalDialogComponent implements OnInit {

    proposal: Proposal;
    authorities: any[];
    isSaving: boolean;

    jobs: Job[];

    freelancers: Freelancer[];

    paymenttypes: PaymentType[];

    proposalstatuscatalogs: ProposalStatusCatalog[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private proposalService: ProposalService,
        private jobService: JobService,
        private freelancerService: FreelancerService,
        private paymentTypeService: PaymentTypeService,
        private proposalStatusCatalogService: ProposalStatusCatalogService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['proposal']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.jobService.query().subscribe(
            (res: Response) => { this.jobs = res.json(); }, (res: Response) => this.onError(res.json()));
        this.freelancerService.query().subscribe(
            (res: Response) => { this.freelancers = res.json(); }, (res: Response) => this.onError(res.json()));
        this.paymentTypeService.query().subscribe(
            (res: Response) => { this.paymenttypes = res.json(); }, (res: Response) => this.onError(res.json()));
        this.proposalStatusCatalogService.query().subscribe(
            (res: Response) => { this.proposalstatuscatalogs = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.proposal.id !== undefined) {
            this.proposalService.update(this.proposal)
                .subscribe((res: Proposal) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.proposalService.create(this.proposal)
                .subscribe((res: Proposal) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Proposal) {
        this.eventManager.broadcast({ name: 'proposalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackJobById(index: number, item: Job) {
        return item.id;
    }

    trackFreelancerById(index: number, item: Freelancer) {
        return item.id;
    }

    trackPaymentTypeById(index: number, item: PaymentType) {
        return item.id;
    }

    trackProposalStatusCatalogById(index: number, item: ProposalStatusCatalog) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-proposal-popup',
    template: ''
})
export class ProposalPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private proposalPopupService: ProposalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.proposalPopupService
                    .open(ProposalDialogComponent, params['id']);
            } else {
                this.modalRef = this.proposalPopupService
                    .open(ProposalDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
