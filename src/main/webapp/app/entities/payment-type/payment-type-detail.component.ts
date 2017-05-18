import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { PaymentType } from './payment-type.model';
import { PaymentTypeService } from './payment-type.service';

@Component({
    selector: 'jhi-payment-type-detail',
    templateUrl: './payment-type-detail.component.html'
})
export class PaymentTypeDetailComponent implements OnInit, OnDestroy {

    paymentType: PaymentType;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private paymentTypeService: PaymentTypeService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['paymentType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPaymentTypes();
    }

    load(id) {
        this.paymentTypeService.find(id).subscribe((paymentType) => {
            this.paymentType = paymentType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPaymentTypes() {
        this.eventSubscriber = this.eventManager.subscribe('paymentTypeListModification', (response) => this.load(this.paymentType.id));
    }
}
