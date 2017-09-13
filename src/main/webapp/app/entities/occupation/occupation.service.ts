import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Occupation } from './occupation.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OccupationService {

    private resourceUrl = 'api/occupations';

    constructor(private http: Http) { }

    create(occupation: Occupation): Observable<Occupation> {
        const copy = this.convert(occupation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(occupation: Occupation): Observable<Occupation> {
        const copy = this.convert(occupation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Occupation> {
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

    private convert(occupation: Occupation): Occupation {
        const copy: Occupation = Object.assign({}, occupation);
        return copy;
    }
}
