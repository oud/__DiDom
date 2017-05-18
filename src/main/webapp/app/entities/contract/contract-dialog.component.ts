import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Contract } from './contract.model';
import { ContractPopupService } from './contract-popup.service';
import { ContractService } from './contract.service';
import { Client, ClientService } from '../client';
import { Freelancer, FreelancerService } from '../freelancer';
import { Proposal, ProposalService } from '../proposal';
import { PaymentType, PaymentTypeService } from '../payment-type';

@Component({
    selector: 'jhi-contract-dialog',
    templateUrl: './contract-dialog.component.html'
})
export class ContractDialogComponent implements OnInit {

    contract: Contract;
    authorities: any[];
    isSaving: boolean;

    clients: Client[];

    freelancers: Freelancer[];

    proposals: Proposal[];

    paymenttypes: PaymentType[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private contractService: ContractService,
        private clientService: ClientService,
        private freelancerService: FreelancerService,
        private proposalService: ProposalService,
        private paymentTypeService: PaymentTypeService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['contract']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.clientService.query().subscribe(
            (res: Response) => { this.clients = res.json(); }, (res: Response) => this.onError(res.json()));
        this.freelancerService.query().subscribe(
            (res: Response) => { this.freelancers = res.json(); }, (res: Response) => this.onError(res.json()));
        this.proposalService.query().subscribe(
            (res: Response) => { this.proposals = res.json(); }, (res: Response) => this.onError(res.json()));
        this.paymentTypeService.query().subscribe(
            (res: Response) => { this.paymenttypes = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contract.id !== undefined) {
            this.contractService.update(this.contract)
                .subscribe((res: Contract) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.contractService.create(this.contract)
                .subscribe((res: Contract) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Contract) {
        this.eventManager.broadcast({ name: 'contractListModification', content: 'OK'});
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

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    trackFreelancerById(index: number, item: Freelancer) {
        return item.id;
    }

    trackProposalById(index: number, item: Proposal) {
        return item.id;
    }

    trackPaymentTypeById(index: number, item: PaymentType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-contract-popup',
    template: ''
})
export class ContractPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contractPopupService: ContractPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.contractPopupService
                    .open(ContractDialogComponent, params['id']);
            } else {
                this.modalRef = this.contractPopupService
                    .open(ContractDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
