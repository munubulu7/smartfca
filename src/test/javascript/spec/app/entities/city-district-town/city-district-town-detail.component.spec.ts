/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CityDistrictTownDetailComponent } from '../../../../../../main/webapp/app/entities/city-district-town/city-district-town-detail.component';
import { CityDistrictTownService } from '../../../../../../main/webapp/app/entities/city-district-town/city-district-town.service';
import { CityDistrictTown } from '../../../../../../main/webapp/app/entities/city-district-town/city-district-town.model';

describe('Component Tests', () => {

    describe('CityDistrictTown Management Detail Component', () => {
        let comp: CityDistrictTownDetailComponent;
        let fixture: ComponentFixture<CityDistrictTownDetailComponent>;
        let service: CityDistrictTownService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [CityDistrictTownDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CityDistrictTownService,
                    JhiEventManager
                ]
            }).overrideTemplate(CityDistrictTownDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityDistrictTownDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityDistrictTownService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CityDistrictTown(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cityDistrictTown).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
