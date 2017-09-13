/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AddressTypeDetailComponent } from '../../../../../../main/webapp/app/entities/address-type/address-type-detail.component';
import { AddressTypeService } from '../../../../../../main/webapp/app/entities/address-type/address-type.service';
import { AddressType } from '../../../../../../main/webapp/app/entities/address-type/address-type.model';

describe('Component Tests', () => {

    describe('AddressType Management Detail Component', () => {
        let comp: AddressTypeDetailComponent;
        let fixture: ComponentFixture<AddressTypeDetailComponent>;
        let service: AddressTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [AddressTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AddressTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(AddressTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AddressType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.addressType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
