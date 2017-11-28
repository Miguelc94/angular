import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';

import {Reporte} from '../models/reporte';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {and} from '@angular/router/src/utils/collection';

@Injectable()
export class ReporteService {

  private url = '/api/reporte';
  private urlAll = '/api/all-reporte';

  constructor(private http: Http) {
  }

  getReporte(): Observable<Reporte[]> {
    return this.http.get(this.urlAll)
      .map(this.extractData)
      .catch(this.handleError);
  }

  prestar(idSolicitante: number, idProducto: number): Observable<number> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.url, idSolicitante - idProducto, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
