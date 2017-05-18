import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DiDomTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FreelancerDetailComponent } from '../../../../../../main/webapp/app/entities/freelancer/freelancer-detail.component';
import { FreelancerService } from '../../../../../../main/webapp/app/entities/freelancer/freelancer.service';
import { Freelancer } from '../../../../../../main/webapp/app/entities/freelancer/freelancer.model';

describe('Component Tests', () => {

    describe('Freelancer Management Detail Component', () => {
        let comp: FreelancerDetailComponent;
        let fixture: ComponentFixture<FreelancerDetailComponent>;
        let service: FreelancerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DiDomTestModule],
                declarations: [FreelancerDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FreelancerService,
                    EventManager
                ]
            }).overrideComponent(FreelancerDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FreelancerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FreelancerService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Freelancer(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.freelancer).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
