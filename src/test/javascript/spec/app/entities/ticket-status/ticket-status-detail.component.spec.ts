/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TicketStatusDetailComponent } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status-detail.component';
import { TicketStatusService } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.service';
import { TicketStatus } from '../../../../../../main/webapp/app/entities/ticket-status/ticket-status.model';

describe('Component Tests', () => {

    describe('TicketStatus Management Detail Component', () => {
        let comp: TicketStatusDetailComponent;
        let fixture: ComponentFixture<TicketStatusDetailComponent>;
        let service: TicketStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [TicketStatusDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TicketStatusService,
                    JhiEventManager
                ]
            }).overrideTemplate(TicketStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TicketStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TicketStatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.ticketStatus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
