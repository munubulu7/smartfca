/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EmployersDetailComponent } from '../../../../../../main/webapp/app/entities/employers/employers-detail.component';
import { EmployersService } from '../../../../../../main/webapp/app/entities/employers/employers.service';
import { Employers } from '../../../../../../main/webapp/app/entities/employers/employers.model';

describe('Component Tests', () => {

    describe('Employers Management Detail Component', () => {
        let comp: EmployersDetailComponent;
        let fixture: ComponentFixture<EmployersDetailComponent>;
        let service: EmployersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [EmployersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EmployersService,
                    JhiEventManager
                ]
            }).overrideTemplate(EmployersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Employers(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.employers).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
