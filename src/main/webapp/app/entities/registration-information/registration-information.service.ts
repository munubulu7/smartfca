import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { RegistrationInformation } from './registration-information.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RegistrationInformationService {

    private resourceUrl = 'api/registration-informations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(registrationInformation: RegistrationInformation): Observable<RegistrationInformation> {
        const copy = this.convert(registrationInformation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(registrationInformation: RegistrationInformation): Observable<RegistrationInformation> {
        const copy = this.convert(registrationInformation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<RegistrationInformation> {
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
        entity.registrationDate = this.dateUtils
            .convertDateTimeFromServer(entity.registrationDate);
    }

    private convert(registrationInformation: RegistrationInformation): RegistrationInformation {
        const copy: RegistrationInformation = Object.assign({}, registrationInformation);

        copy.registrationDate = this.dateUtils.toDate(registrationInformation.registrationDate);
        return copy;
    }
}
