import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Skill } from './skill.model';
import { SkillPopupService } from './skill-popup.service';
import { SkillService } from './skill.service';
import { Freelancer, FreelancerService } from '../freelancer';

@Component({
    selector: 'jhi-skill-dialog',
    templateUrl: './skill-dialog.component.html'
})
export class SkillDialogComponent implements OnInit {

    skill: Skill;
    authorities: any[];
    isSaving: boolean;

    freelancers: Freelancer[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private skillService: SkillService,
        private freelancerService: FreelancerService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['skill']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.freelancerService.query().subscribe(
            (res: Response) => { this.freelancers = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.skill.id !== undefined) {
            this.skillService.update(this.skill)
                .subscribe((res: Skill) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.skillService.create(this.skill)
                .subscribe((res: Skill) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Skill) {
        this.eventManager.broadcast({ name: 'skillListModification', content: 'OK'});
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
    selector: 'jhi-skill-popup',
    template: ''
})
export class SkillPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillPopupService: SkillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.skillPopupService
                    .open(SkillDialogComponent, params['id']);
            } else {
                this.modalRef = this.skillPopupService
                    .open(SkillDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
