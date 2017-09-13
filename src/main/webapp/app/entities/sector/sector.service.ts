import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Sector } from './sector.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SectorService {

    private resourceUrl = 'api/sectors';

    constructor(private http: Http) { }

    create(sector: Sector): Observable<Sector> {
        const copy = this.convert(sector);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(sector: Sector): Observable<Sector> {
        const copy = this.convert(sector);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Sector> {
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

    private convert(sector: Sector): Sector {
        const copy: Sector = Object.assign({}, sector);
        return copy;
    }
}
