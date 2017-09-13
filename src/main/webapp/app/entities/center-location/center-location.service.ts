import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CenterLocation } from './center-location.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CenterLocationService {

    private resourceUrl = 'api/center-locations';

    constructor(private http: Http) { }

    create(centerLocation: CenterLocation): Observable<CenterLocation> {
        const copy = this.convert(centerLocation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(centerLocation: CenterLocation): Observable<CenterLocation> {
        const copy = this.convert(centerLocation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<CenterLocation> {
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

    private convert(centerLocation: CenterLocation): CenterLocation {
        const copy: CenterLocation = Object.assign({}, centerLocation);
        return copy;
    }
}
