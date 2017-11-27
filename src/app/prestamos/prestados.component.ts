import {Component, OnInit} from '@angular/core';
import {ProductoService} from '../services/producto.service';
import {Producto} from '../models/producto';

@Component({
  selector: 'app-prestado',
  templateUrl: './prestados.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestadosComponent implements OnInit {

  title = 'Productos Prestados';
  prestados: Producto[];
  statusCode: number;

  constructor(private proService: ProductoService) {
  }

  productosPrestados() {
    this.proService.productosPrestados()
      .subscribe(data => this.prestados = data,
        errorCode => this.statusCode = errorCode );
  }

  ngOnInit(): void {
    this.productosPrestados();
  }

}
