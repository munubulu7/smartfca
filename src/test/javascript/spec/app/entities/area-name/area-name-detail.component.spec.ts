/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AreaNameDetailComponent } from '../../../../../../main/webapp/app/entities/area-name/area-name-detail.component';
import { AreaNameService } from '../../../../../../main/webapp/app/entities/area-name/area-name.service';
import { AreaName } from '../../../../../../main/webapp/app/entities/area-name/area-name.model';

describe('Component Tests', () => {

    describe('AreaName Management Detail Component', () => {
        let comp: AreaNameDetailComponent;
        let fixture: ComponentFixture<AreaNameDetailComponent>;
        let service: AreaNameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [AreaNameDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AreaNameService,
                    JhiEventManager
                ]
            }).overrideTemplate(AreaNameDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AreaNameDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AreaNameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AreaName(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.areaName).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
