import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';

import {Producto} from '../models/producto';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductoService {

  private urlAll = '/api/all-productos';
  private url = '/api/productos';

  constructor(private http: Http) {
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get(this.urlAll)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createProducto(producto: Producto): Observable<number> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.url, producto, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  getProductoById(productoId: string): Observable<Producto> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const cpParams = new URLSearchParams();
    cpParams.set('id', productoId);
    const options = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.get(this.url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateProducto(producto: Producto): Observable<number> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.put(this.url, producto, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteProducto(productoId: string): Observable<number> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const cpParams = new URLSearchParams();
    cpParams.set('id', productoId);
    const options = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.delete(this.url, options)
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
