/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AddressInformationDetailComponent } from '../../../../../../main/webapp/app/entities/address-information/address-information-detail.component';
import { AddressInformationService } from '../../../../../../main/webapp/app/entities/address-information/address-information.service';
import { AddressInformation } from '../../../../../../main/webapp/app/entities/address-information/address-information.model';

describe('Component Tests', () => {

    describe('AddressInformation Management Detail Component', () => {
        let comp: AddressInformationDetailComponent;
        let fixture: ComponentFixture<AddressInformationDetailComponent>;
        let service: AddressInformationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [AddressInformationDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AddressInformationService,
                    JhiEventManager
                ]
            }).overrideTemplate(AddressInformationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressInformationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressInformationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AddressInformation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.addressInformation).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
