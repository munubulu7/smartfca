import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { RegistrationType } from './registration-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RegistrationTypeService {

    private resourceUrl = 'api/registration-types';

    constructor(private http: Http) { }

    create(registrationType: RegistrationType): Observable<RegistrationType> {
        const copy = this.convert(registrationType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(registrationType: RegistrationType): Observable<RegistrationType> {
        const copy = this.convert(registrationType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<RegistrationType> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(registrationType: RegistrationType): RegistrationType {
        const copy: RegistrationType = Object.assign({}, registrationType);
        return copy;
    }
}
