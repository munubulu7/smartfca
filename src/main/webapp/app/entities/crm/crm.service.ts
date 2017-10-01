import {Injectable} from "@angular/core";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import {RegistrationInformation} from "../registration-information/registration-information.model";

@Injectable()
export class CrmService {

    private resourceUrl = 'api/crm/';

    constructor(private http: Http) {
    }

    public getAllCenterLocations(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + 'center-locations')
            .map((res: Response) => this.convertResponse(res));
    }

    public getAllRegistrationType(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + 'registration-type')
            .map((res: Response) => this.convertResponse(res));
    }

    public getEmployersByOccupation(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}employers/occupation/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getDistrictByState(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}district/state/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getAreaNameByDistrictAreaType(distId: Number, areaTypeId: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}area-name/district/area-type/${distId}/${areaTypeId}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getPoliceStationByAreaName(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}police-station/area/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getPostByPoliceStation(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}post-office/police-station/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getVillagesByPostOffice(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}village/post-office/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getPincodeByVillage(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}pincode/village/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getAddresseesByRegistration(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}address/reg-inf/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getBasicinformationByRegistration(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}basic-info/reg-inf/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getContactPersonByBasicInformationId(id: Number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}conct-person/basic-info/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    public getAllTickets(start: string, limit: string, ticketStatusId: String): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}tickets`, {
            params: {
                'startIndex': start,
                'limit': limit,
                'ticketStatusId': ticketStatusId
            }
        })
            .map((res: Response) => this.convertResponse(res));
    }

    genarateTicketNumber(): Observable<String> {
        return this.http.get(`${this.resourceUrl}genarate-ticket-no`).map((res: Response) => {
            return res.json();
        });
    }

    getCurrentDateTime(): Observable<string> {
        return this.http.get(`${this.resourceUrl}current-date-time`).map((res: Response) => {
            return res.json();
        });
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(registrationInformation: RegistrationInformation): RegistrationInformation {
        const copy: RegistrationInformation = Object.assign({}, registrationInformation);
        return copy;
    }
}
