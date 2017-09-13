/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SectorDetailComponent } from '../../../../../../main/webapp/app/entities/sector/sector-detail.component';
import { SectorService } from '../../../../../../main/webapp/app/entities/sector/sector.service';
import { Sector } from '../../../../../../main/webapp/app/entities/sector/sector.model';

describe('Component Tests', () => {

    describe('Sector Management Detail Component', () => {
        let comp: SectorDetailComponent;
        let fixture: ComponentFixture<SectorDetailComponent>;
        let service: SectorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [SectorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SectorService,
                    JhiEventManager
                ]
            }).overrideTemplate(SectorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SectorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Sector(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.sector).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
