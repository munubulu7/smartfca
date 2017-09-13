/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AreaTypeDetailComponent } from '../../../../../../main/webapp/app/entities/area-type/area-type-detail.component';
import { AreaTypeService } from '../../../../../../main/webapp/app/entities/area-type/area-type.service';
import { AreaType } from '../../../../../../main/webapp/app/entities/area-type/area-type.model';

describe('Component Tests', () => {

    describe('AreaType Management Detail Component', () => {
        let comp: AreaTypeDetailComponent;
        let fixture: ComponentFixture<AreaTypeDetailComponent>;
        let service: AreaTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [AreaTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AreaTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(AreaTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AreaTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AreaTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AreaType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.areaType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
