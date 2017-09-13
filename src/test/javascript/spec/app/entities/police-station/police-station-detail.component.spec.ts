/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PoliceStationDetailComponent } from '../../../../../../main/webapp/app/entities/police-station/police-station-detail.component';
import { PoliceStationService } from '../../../../../../main/webapp/app/entities/police-station/police-station.service';
import { PoliceStation } from '../../../../../../main/webapp/app/entities/police-station/police-station.model';

describe('Component Tests', () => {

    describe('PoliceStation Management Detail Component', () => {
        let comp: PoliceStationDetailComponent;
        let fixture: ComponentFixture<PoliceStationDetailComponent>;
        let service: PoliceStationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [PoliceStationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PoliceStationService,
                    JhiEventManager
                ]
            }).overrideTemplate(PoliceStationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PoliceStationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoliceStationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PoliceStation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.policeStation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
