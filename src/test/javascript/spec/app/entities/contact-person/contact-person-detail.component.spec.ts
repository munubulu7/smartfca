/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ContactPersonDetailComponent } from '../../../../../../main/webapp/app/entities/contact-person/contact-person-detail.component';
import { ContactPersonService } from '../../../../../../main/webapp/app/entities/contact-person/contact-person.service';
import { ContactPerson } from '../../../../../../main/webapp/app/entities/contact-person/contact-person.model';

describe('Component Tests', () => {

    describe('ContactPerson Management Detail Component', () => {
        let comp: ContactPersonDetailComponent;
        let fixture: ComponentFixture<ContactPersonDetailComponent>;
        let service: ContactPersonService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [ContactPersonDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ContactPersonService,
                    JhiEventManager
                ]
            }).overrideTemplate(ContactPersonDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactPersonDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactPersonService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ContactPerson(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.contactPerson).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
