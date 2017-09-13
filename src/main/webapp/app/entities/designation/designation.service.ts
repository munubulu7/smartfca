import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Designation } from './designation.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DesignationService {

    private resourceUrl = 'api/designations';

    constructor(private http: Http) { }

    create(designation: Designation): Observable<Designation> {
        const copy = this.convert(designation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(designation: Designation): Observable<Designation> {
        const copy = this.convert(designation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Designation> {
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

    private convert(designation: Designation): Designation {
        const copy: Designation = Object.assign({}, designation);
        return copy;
    }
}
