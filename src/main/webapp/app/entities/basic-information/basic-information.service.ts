import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { BasicInformation } from './basic-information.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BasicInformationService {

    private resourceUrl = 'api/basic-informations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(basicInformation: BasicInformation): Observable<BasicInformation> {
        const copy = this.convert(basicInformation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(basicInformation: BasicInformation): Observable<BasicInformation> {
        const copy = this.convert(basicInformation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<BasicInformation> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(entity.dateOfBirth);
        entity.yearOfEmployed = this.dateUtils
            .convertLocalDateFromServer(entity.yearOfEmployed);
        entity.establishment = this.dateUtils
            .convertLocalDateFromServer(entity.establishment);
        entity.commencement = this.dateUtils
            .convertLocalDateFromServer(entity.commencement);
    }

    private convert(basicInformation: BasicInformation): BasicInformation {
        const copy: BasicInformation = Object.assign({}, basicInformation);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateToServer(basicInformation.dateOfBirth);
        copy.yearOfEmployed = this.dateUtils
            .convertLocalDateToServer(basicInformation.yearOfEmployed);
        copy.establishment = this.dateUtils
            .convertLocalDateToServer(basicInformation.establishment);
        copy.commencement = this.dateUtils
            .convertLocalDateToServer(basicInformation.commencement);
        return copy;
    }
}
