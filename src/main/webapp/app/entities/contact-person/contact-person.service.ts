import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ContactPerson } from './contact-person.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ContactPersonService {

    private resourceUrl = 'api/contact-people';

    constructor(private http: Http) { }

    create(contactPerson: ContactPerson): Observable<ContactPerson> {
        const copy = this.convert(contactPerson);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(contactPerson: ContactPerson): Observable<ContactPerson> {
        const copy = this.convert(contactPerson);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ContactPerson> {
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

    private convert(contactPerson: ContactPerson): ContactPerson {
        const copy: ContactPerson = Object.assign({}, contactPerson);
        return copy;
    }
}
