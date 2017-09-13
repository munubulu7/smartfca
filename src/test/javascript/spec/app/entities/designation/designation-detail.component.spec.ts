/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DesignationDetailComponent } from '../../../../../../main/webapp/app/entities/designation/designation-detail.component';
import { DesignationService } from '../../../../../../main/webapp/app/entities/designation/designation.service';
import { Designation } from '../../../../../../main/webapp/app/entities/designation/designation.model';

describe('Component Tests', () => {

    describe('Designation Management Detail Component', () => {
        let comp: DesignationDetailComponent;
        let fixture: ComponentFixture<DesignationDetailComponent>;
        let service: DesignationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [DesignationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DesignationService,
                    JhiEventManager
                ]
            }).overrideTemplate(DesignationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DesignationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DesignationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Designation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.designation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
