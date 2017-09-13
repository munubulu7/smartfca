import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AreaType } from './area-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AreaTypeService {

    private resourceUrl = 'api/area-types';

    constructor(private http: Http) { }

    create(areaType: AreaType): Observable<AreaType> {
        const copy = this.convert(areaType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(areaType: AreaType): Observable<AreaType> {
        const copy = this.convert(areaType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<AreaType> {
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

    private convert(areaType: AreaType): AreaType {
        const copy: AreaType = Object.assign({}, areaType);
        return copy;
    }
}
