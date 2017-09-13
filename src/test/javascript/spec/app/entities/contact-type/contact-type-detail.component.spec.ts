/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ContactTypeDetailComponent } from '../../../../../../main/webapp/app/entities/contact-type/contact-type-detail.component';
import { ContactTypeService } from '../../../../../../main/webapp/app/entities/contact-type/contact-type.service';
import { ContactType } from '../../../../../../main/webapp/app/entities/contact-type/contact-type.model';

describe('Component Tests', () => {

    describe('ContactType Management Detail Component', () => {
        let comp: ContactTypeDetailComponent;
        let fixture: ComponentFixture<ContactTypeDetailComponent>;
        let service: ContactTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [ContactTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ContactTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(ContactTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ContactType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.contactType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
