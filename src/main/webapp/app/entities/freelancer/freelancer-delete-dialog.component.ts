import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Freelancer } from './freelancer.model';
import { FreelancerPopupService } from './freelancer-popup.service';
import { FreelancerService } from './freelancer.service';

@Component({
    selector: 'jhi-freelancer-delete-dialog',
    templateUrl: './freelancer-delete-dialog.component.html'
})
export class FreelancerDeleteDialogComponent {

    freelancer: Freelancer;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private freelancerService: FreelancerService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['freelancer']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.freelancerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'freelancerListModification',
                content: 'Deleted an freelancer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-freelancer-delete-popup',
    template: ''
})
export class FreelancerDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private freelancerPopupService: FreelancerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.freelancerPopupService
                .open(FreelancerDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
