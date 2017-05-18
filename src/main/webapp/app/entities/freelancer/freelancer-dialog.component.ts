import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Freelancer } from './freelancer.model';
import { FreelancerPopupService } from './freelancer-popup.service';
import { FreelancerService } from './freelancer.service';
import { User, UserService } from '../../shared';
import { Location, LocationService } from '../location';
import { Skill, SkillService } from '../skill';

@Component({
    selector: 'jhi-freelancer-dialog',
    templateUrl: './freelancer-dialog.component.html'
})
export class FreelancerDialogComponent implements OnInit {

    freelancer: Freelancer;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    locations: Location[];

    skills: Skill[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private freelancerService: FreelancerService,
        private userService: UserService,
        private locationService: LocationService,
        private skillService: SkillService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['freelancer']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.locationService.query().subscribe(
            (res: Response) => { this.locations = res.json(); }, (res: Response) => this.onError(res.json()));
        this.skillService.query().subscribe(
            (res: Response) => { this.skills = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.freelancer.id !== undefined) {
            this.freelancerService.update(this.freelancer)
                .subscribe((res: Freelancer) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.freelancerService.create(this.freelancer)
                .subscribe((res: Freelancer) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Freelancer) {
        this.eventManager.broadcast({ name: 'freelancerListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackSkillById(index: number, item: Skill) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-freelancer-popup',
    template: ''
})
export class FreelancerPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private freelancerPopupService: FreelancerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.freelancerPopupService
                    .open(FreelancerDialogComponent, params['id']);
            } else {
                this.modalRef = this.freelancerPopupService
                    .open(FreelancerDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
