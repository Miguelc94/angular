import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ProductoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = '/api/productos';

  constructor(private http: Http) { }

  getProductos() {
    return this.http.get(this.url)
      .map((res: Response) => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
