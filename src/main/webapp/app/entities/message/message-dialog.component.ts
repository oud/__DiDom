import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Message } from './message.model';
import { MessagePopupService } from './message-popup.service';
import { MessageService } from './message.service';
import { Freelancer, FreelancerService } from '../freelancer';
import { Client, ClientService } from '../client';
import { Proposal, ProposalService } from '../proposal';
import { ProposalStatusCatalog, ProposalStatusCatalogService } from '../proposal-status-catalog';

@Component({
    selector: 'jhi-message-dialog',
    templateUrl: './message-dialog.component.html'
})
export class MessageDialogComponent implements OnInit {

    message: Message;
    authorities: any[];
    isSaving: boolean;

    freelancers: Freelancer[];

    clients: Client[];

    proposals: Proposal[];

    proposalstatuscatalogs: ProposalStatusCatalog[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private messageService: MessageService,
        private freelancerService: FreelancerService,
        private clientService: ClientService,
        private proposalService: ProposalService,
        private proposalStatusCatalogService: ProposalStatusCatalogService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['message']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.freelancerService.query().subscribe(
            (res: Response) => { this.freelancers = res.json(); }, (res: Response) => this.onError(res.json()));
        this.clientService.query().subscribe(
            (res: Response) => { this.clients = res.json(); }, (res: Response) => this.onError(res.json()));
        this.proposalService.query().subscribe(
            (res: Response) => { this.proposals = res.json(); }, (res: Response) => this.onError(res.json()));
        this.proposalStatusCatalogService.query().subscribe(
            (res: Response) => { this.proposalstatuscatalogs = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.message.id !== undefined) {
            this.messageService.update(this.message)
                .subscribe((res: Message) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.messageService.create(this.message)
                .subscribe((res: Message) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Message) {
        this.eventManager.broadcast({ name: 'messageListModification', content: 'OK'});
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

    trackFreelancerById(index: number, item: Freelancer) {
        return item.id;
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    trackProposalById(index: number, item: Proposal) {
        return item.id;
    }

    trackProposalStatusCatalogById(index: number, item: ProposalStatusCatalog) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-message-popup',
    template: ''
})
export class MessagePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messagePopupService: MessagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.messagePopupService
                    .open(MessageDialogComponent, params['id']);
            } else {
                this.modalRef = this.messagePopupService
                    .open(MessageDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
