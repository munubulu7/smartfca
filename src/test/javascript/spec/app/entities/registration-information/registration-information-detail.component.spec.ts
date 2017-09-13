/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RegistrationInformationDetailComponent } from '../../../../../../main/webapp/app/entities/registration-information/registration-information-detail.component';
import { RegistrationInformationService } from '../../../../../../main/webapp/app/entities/registration-information/registration-information.service';
import { RegistrationInformation } from '../../../../../../main/webapp/app/entities/registration-information/registration-information.model';

describe('Component Tests', () => {

    describe('RegistrationInformation Management Detail Component', () => {
        let comp: RegistrationInformationDetailComponent;
        let fixture: ComponentFixture<RegistrationInformationDetailComponent>;
        let service: RegistrationInformationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [RegistrationInformationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RegistrationInformationService,
                    JhiEventManager
                ]
            }).overrideTemplate(RegistrationInformationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistrationInformationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistrationInformationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RegistrationInformation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.registrationInformation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
