/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OccupationDetailComponent } from '../../../../../../main/webapp/app/entities/occupation/occupation-detail.component';
import { OccupationService } from '../../../../../../main/webapp/app/entities/occupation/occupation.service';
import { Occupation } from '../../../../../../main/webapp/app/entities/occupation/occupation.model';

describe('Component Tests', () => {

    describe('Occupation Management Detail Component', () => {
        let comp: OccupationDetailComponent;
        let fixture: ComponentFixture<OccupationDetailComponent>;
        let service: OccupationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [OccupationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OccupationService,
                    JhiEventManager
                ]
            }).overrideTemplate(OccupationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OccupationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OccupationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Occupation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.occupation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
