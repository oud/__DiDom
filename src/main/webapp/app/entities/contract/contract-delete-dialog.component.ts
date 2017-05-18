import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Contract } from './contract.model';
import { ContractPopupService } from './contract-popup.service';
import { ContractService } from './contract.service';

@Component({
    selector: 'jhi-contract-delete-dialog',
    templateUrl: './contract-delete-dialog.component.html'
})
export class ContractDeleteDialogComponent {

    contract: Contract;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private contractService: ContractService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['contract']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contractService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contractListModification',
                content: 'Deleted an contract'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contract-delete-popup',
    template: ''
})
export class ContractDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contractPopupService: ContractPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.contractPopupService
                .open(ContractDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
