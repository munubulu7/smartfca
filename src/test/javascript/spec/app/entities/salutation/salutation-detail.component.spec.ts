/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SalutationDetailComponent } from '../../../../../../main/webapp/app/entities/salutation/salutation-detail.component';
import { SalutationService } from '../../../../../../main/webapp/app/entities/salutation/salutation.service';
import { Salutation } from '../../../../../../main/webapp/app/entities/salutation/salutation.model';

describe('Component Tests', () => {

    describe('Salutation Management Detail Component', () => {
        let comp: SalutationDetailComponent;
        let fixture: ComponentFixture<SalutationDetailComponent>;
        let service: SalutationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [SalutationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SalutationService,
                    JhiEventManager
                ]
            }).overrideTemplate(SalutationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalutationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalutationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Salutation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.salutation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
