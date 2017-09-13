/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ResidentialStatusDetailComponent } from '../../../../../../main/webapp/app/entities/residential-status/residential-status-detail.component';
import { ResidentialStatusService } from '../../../../../../main/webapp/app/entities/residential-status/residential-status.service';
import { ResidentialStatus } from '../../../../../../main/webapp/app/entities/residential-status/residential-status.model';

describe('Component Tests', () => {

    describe('ResidentialStatus Management Detail Component', () => {
        let comp: ResidentialStatusDetailComponent;
        let fixture: ComponentFixture<ResidentialStatusDetailComponent>;
        let service: ResidentialStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [ResidentialStatusDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ResidentialStatusService,
                    JhiEventManager
                ]
            }).overrideTemplate(ResidentialStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResidentialStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResidentialStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ResidentialStatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.residentialStatus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
