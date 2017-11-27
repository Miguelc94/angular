import {Component, OnInit} from '@angular/core';
import {ProductoService} from '../services/producto.service';
import {Producto} from '../models/producto';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class DisponibleComponent implements OnInit {

  title = 'Productos Disponibles';
  disponible: Producto[];
  statusCode: number;

  constructor(private proService: ProductoService) {
  }

  productosDisponibles() {
    this.proService.productosDisponiles()
      .subscribe(data => this.disponible = data,
        errorCode => this.statusCode = errorCode );
  }

  ngOnInit(): void {
    this.productosDisponibles();
  }

}
