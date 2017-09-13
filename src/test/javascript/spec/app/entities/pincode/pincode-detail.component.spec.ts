/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PincodeDetailComponent } from '../../../../../../main/webapp/app/entities/pincode/pincode-detail.component';
import { PincodeService } from '../../../../../../main/webapp/app/entities/pincode/pincode.service';
import { Pincode } from '../../../../../../main/webapp/app/entities/pincode/pincode.model';

describe('Component Tests', () => {

    describe('Pincode Management Detail Component', () => {
        let comp: PincodeDetailComponent;
        let fixture: ComponentFixture<PincodeDetailComponent>;
        let service: PincodeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [PincodeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PincodeService,
                    JhiEventManager
                ]
            }).overrideTemplate(PincodeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PincodeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PincodeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pincode(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pincode).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
