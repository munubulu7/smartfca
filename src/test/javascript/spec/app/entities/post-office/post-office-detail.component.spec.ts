/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PostOfficeDetailComponent } from '../../../../../../main/webapp/app/entities/post-office/post-office-detail.component';
import { PostOfficeService } from '../../../../../../main/webapp/app/entities/post-office/post-office.service';
import { PostOffice } from '../../../../../../main/webapp/app/entities/post-office/post-office.model';

describe('Component Tests', () => {

    describe('PostOffice Management Detail Component', () => {
        let comp: PostOfficeDetailComponent;
        let fixture: ComponentFixture<PostOfficeDetailComponent>;
        let service: PostOfficeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [PostOfficeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PostOfficeService,
                    JhiEventManager
                ]
            }).overrideTemplate(PostOfficeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostOfficeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostOfficeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PostOffice(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.postOffice).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
