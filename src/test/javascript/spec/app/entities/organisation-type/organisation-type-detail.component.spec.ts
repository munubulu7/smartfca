/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Smartfca001TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OrganisationTypeDetailComponent } from '../../../../../../main/webapp/app/entities/organisation-type/organisation-type-detail.component';
import { OrganisationTypeService } from '../../../../../../main/webapp/app/entities/organisation-type/organisation-type.service';
import { OrganisationType } from '../../../../../../main/webapp/app/entities/organisation-type/organisation-type.model';

describe('Component Tests', () => {

    describe('OrganisationType Management Detail Component', () => {
        let comp: OrganisationTypeDetailComponent;
        let fixture: ComponentFixture<OrganisationTypeDetailComponent>;
        let service: OrganisationTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Smartfca001TestModule],
                declarations: [OrganisationTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OrganisationTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(OrganisationTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new OrganisationType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.organisationType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
