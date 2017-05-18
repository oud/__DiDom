import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Contract } from './contract.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class ContractService {

    private resourceUrl = 'api/contracts';
    private resourceSearchUrl = 'api/_search/contracts';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(contract: Contract): Observable<Contract> {
        const copy: Contract = Object.assign({}, contract);
        copy.startTime = this.dateUtils.toDate(contract.startTime);
        copy.endTime = this.dateUtils.toDate(contract.endTime);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(contract: Contract): Observable<Contract> {
        const copy: Contract = Object.assign({}, contract);

        copy.startTime = this.dateUtils.toDate(contract.startTime);

        copy.endTime = this.dateUtils.toDate(contract.endTime);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Contract> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.startTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.startTime);
            jsonResponse.endTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.endTime);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }


    private convertResponse(res: any): any {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].startTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].startTime);
            jsonResponse[i].endTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].endTime);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
