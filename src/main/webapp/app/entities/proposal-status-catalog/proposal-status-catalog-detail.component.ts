import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ProposalStatusCatalog } from './proposal-status-catalog.model';
import { ProposalStatusCatalogService } from './proposal-status-catalog.service';

@Component({
    selector: 'jhi-proposal-status-catalog-detail',
    templateUrl: './proposal-status-catalog-detail.component.html'
})
export class ProposalStatusCatalogDetailComponent implements OnInit, OnDestroy {

    proposalStatusCatalog: ProposalStatusCatalog;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private proposalStatusCatalogService: ProposalStatusCatalogService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['proposalStatusCatalog']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProposalStatusCatalogs();
    }

    load(id) {
        this.proposalStatusCatalogService.find(id).subscribe((proposalStatusCatalog) => {
            this.proposalStatusCatalog = proposalStatusCatalog;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProposalStatusCatalogs() {
        this.eventSubscriber = this.eventManager.subscribe('proposalStatusCatalogListModification', (response) => this.load(this.proposalStatusCatalog.id));
    }
}
