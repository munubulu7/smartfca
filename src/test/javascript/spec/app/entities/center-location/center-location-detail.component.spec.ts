/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CenterLocationDetailComponent } from '../../../../../../main/webapp/app/entities/center-location/center-location-detail.component';
import { CenterLocationService } from '../../../../../../main/webapp/app/entities/center-location/center-location.service';
import { CenterLocation } from '../../../../../../main/webapp/app/entities/center-location/center-location.model';

describe('Component Tests', () => {

    describe('CenterLocation Management Detail Component', () => {
        let comp: CenterLocationDetailComponent;
        let fixture: ComponentFixture<CenterLocationDetailComponent>;
        let service: CenterLocationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [CenterLocationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CenterLocationService,
                    JhiEventManager
                ]
            }).overrideTemplate(CenterLocationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CenterLocationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CenterLocationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CenterLocation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.centerLocation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
