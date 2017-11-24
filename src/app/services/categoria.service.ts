import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Categoria} from '../models/categoria';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoriaService {

  private url = 'api/categorias';

  constructor(private http: Http) {
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createCategoria(categoria: Categoria): Observable<number> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.url, categoria, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  getCategoriaById(categoriaId: string): Observable<Categoria> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const cpParams = new URLSearchParams();
    cpParams.set('id', categoriaId);
    const options = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.get(this.url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateCategoria(categoria: Categoria): Observable<number> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.put(this.url, categoria, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteCategoria(categoriaId: string): Observable<number> {
    const cpHeaders = new Headers({'Content-Type': 'application/json'});
    const cpParams = new URLSearchParams();
    cpParams.set('id', categoriaId);
    const options = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.delete(this.url, options)
      .map(succes => succes.status)
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
