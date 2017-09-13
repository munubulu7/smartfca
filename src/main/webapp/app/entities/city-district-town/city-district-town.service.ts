import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CityDistrictTown } from './city-district-town.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CityDistrictTownService {

    private resourceUrl = 'api/city-district-towns';

    constructor(private http: Http) { }

    create(cityDistrictTown: CityDistrictTown): Observable<CityDistrictTown> {
        const copy = this.convert(cityDistrictTown);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(cityDistrictTown: CityDistrictTown): Observable<CityDistrictTown> {
        const copy = this.convert(cityDistrictTown);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<CityDistrictTown> {
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

    private convert(cityDistrictTown: CityDistrictTown): CityDistrictTown {
        const copy: CityDistrictTown = Object.assign({}, cityDistrictTown);
        return copy;
    }
}
