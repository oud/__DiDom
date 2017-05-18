import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DiDomTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ContractDetailComponent } from '../../../../../../main/webapp/app/entities/contract/contract-detail.component';
import { ContractService } from '../../../../../../main/webapp/app/entities/contract/contract.service';
import { Contract } from '../../../../../../main/webapp/app/entities/contract/contract.model';

describe('Component Tests', () => {

    describe('Contract Management Detail Component', () => {
        let comp: ContractDetailComponent;
        let fixture: ComponentFixture<ContractDetailComponent>;
        let service: ContractService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DiDomTestModule],
                declarations: [ContractDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ContractService,
                    EventManager
                ]
            }).overrideComponent(ContractDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContractDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContractService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Contract(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.contract).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
