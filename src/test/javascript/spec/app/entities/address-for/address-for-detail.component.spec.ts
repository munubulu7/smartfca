/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AddressForDetailComponent } from '../../../../../../main/webapp/app/entities/address-for/address-for-detail.component';
import { AddressForService } from '../../../../../../main/webapp/app/entities/address-for/address-for.service';
import { AddressFor } from '../../../../../../main/webapp/app/entities/address-for/address-for.model';

describe('Component Tests', () => {

    describe('AddressFor Management Detail Component', () => {
        let comp: AddressForDetailComponent;
        let fixture: ComponentFixture<AddressForDetailComponent>;
        let service: AddressForService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [AddressForDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AddressForService,
                    JhiEventManager
                ]
            }).overrideTemplate(AddressForDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressForDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressForService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AddressFor(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.addressFor).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
