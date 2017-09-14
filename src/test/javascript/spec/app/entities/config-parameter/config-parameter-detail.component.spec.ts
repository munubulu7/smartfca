/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ConfigParameterDetailComponent } from '../../../../../../main/webapp/app/entities/config-parameter/config-parameter-detail.component';
import { ConfigParameterService } from '../../../../../../main/webapp/app/entities/config-parameter/config-parameter.service';
import { ConfigParameter } from '../../../../../../main/webapp/app/entities/config-parameter/config-parameter.model';

describe('Component Tests', () => {

    describe('ConfigParameter Management Detail Component', () => {
        let comp: ConfigParameterDetailComponent;
        let fixture: ComponentFixture<ConfigParameterDetailComponent>;
        let service: ConfigParameterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [ConfigParameterDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ConfigParameterService,
                    JhiEventManager
                ]
            }).overrideTemplate(ConfigParameterDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConfigParameterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConfigParameterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ConfigParameter(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.configParameter).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
