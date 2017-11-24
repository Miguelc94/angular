import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';
import { CategoriaService } from '../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  title = 'Listado de Productos';
  productos: Producto[];
  categorias: Categoria[];
  constructor(private proService: ProductoService, private catService: CategoriaService) { }

  getProductos() {
    this.catService.getCategorias().
    subscribe(data => this.categorias = data);
    return this.proService.getProductos()
      .subscribe(data => this.productos = data);
  }


  ngOnInit() {
    this.getProductos();
    console.log(this.productos);
  }

}
