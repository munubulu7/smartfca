import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ContactType } from './contact-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ContactTypeService {

    private resourceUrl = 'api/contact-types';

    constructor(private http: Http) { }

    create(contactType: ContactType): Observable<ContactType> {
        const copy = this.convert(contactType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(contactType: ContactType): Observable<ContactType> {
        const copy = this.convert(contactType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ContactType> {
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

    private convert(contactType: ContactType): ContactType {
        const copy: ContactType = Object.assign({}, contactType);
        return copy;
    }
}
