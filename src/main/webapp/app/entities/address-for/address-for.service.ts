import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AddressFor } from './address-for.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AddressForService {

    private resourceUrl = 'api/address-fors';

    constructor(private http: Http) { }

    create(addressFor: AddressFor): Observable<AddressFor> {
        const copy = this.convert(addressFor);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(addressFor: AddressFor): Observable<AddressFor> {
        const copy = this.convert(addressFor);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<AddressFor> {
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

    private convert(addressFor: AddressFor): AddressFor {
        const copy: AddressFor = Object.assign({}, addressFor);
        return copy;
    }
}
