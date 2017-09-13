/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PremisesBuildingVillageDetailComponent } from '../../../../../../main/webapp/app/entities/premises-building-village/premises-building-village-detail.component';
import { PremisesBuildingVillageService } from '../../../../../../main/webapp/app/entities/premises-building-village/premises-building-village.service';
import { PremisesBuildingVillage } from '../../../../../../main/webapp/app/entities/premises-building-village/premises-building-village.model';

describe('Component Tests', () => {

    describe('PremisesBuildingVillage Management Detail Component', () => {
        let comp: PremisesBuildingVillageDetailComponent;
        let fixture: ComponentFixture<PremisesBuildingVillageDetailComponent>;
        let service: PremisesBuildingVillageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [PremisesBuildingVillageDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PremisesBuildingVillageService,
                    JhiEventManager
                ]
            }).overrideTemplate(PremisesBuildingVillageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PremisesBuildingVillageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PremisesBuildingVillageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PremisesBuildingVillage(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.premisesBuildingVillage).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
