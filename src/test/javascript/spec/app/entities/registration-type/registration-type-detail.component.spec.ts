/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RegistrationTypeDetailComponent } from '../../../../../../main/webapp/app/entities/registration-type/registration-type-detail.component';
import { RegistrationTypeService } from '../../../../../../main/webapp/app/entities/registration-type/registration-type.service';
import { RegistrationType } from '../../../../../../main/webapp/app/entities/registration-type/registration-type.model';

describe('Component Tests', () => {

    describe('RegistrationType Management Detail Component', () => {
        let comp: RegistrationTypeDetailComponent;
        let fixture: ComponentFixture<RegistrationTypeDetailComponent>;
        let service: RegistrationTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [RegistrationTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RegistrationTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(RegistrationTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistrationTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistrationTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RegistrationType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.registrationType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
