import {Categoria} from '../models/categoria';
import {Producto} from '../models/producto';
import {CategoriaService} from '../services/categoria.service';
import {Component, OnInit} from '@angular/core';
import {ProductoService} from '../services/producto.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  title = 'Listado de Productos';
  productos: Producto[];
  categorias: Categoria[];
  statusCode: number;
  requesrProcessing = false;
  productoUpdate = null;
  processValidation = false;

  // create form
  productoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required)
  });

  // create constructor to get service instance
  constructor(private proService: ProductoService, private catService: CategoriaService) {
  }

  // create ngOnit() and load categorias and productos
  ngOnInit(): void {
    this.getProductos();
    console.log(this.productos);
  }

  // fetch all categorias
  getProductos() {
    this.catService.getCategorias().subscribe(data => this.categorias = data, errorCode => this.statusCode = errorCode);
    this.proService.getProductos()
      .subscribe(
        data => this.productos = data,
        errorCode => this.statusCode = errorCode);
  }

  // Handle create and update categoria
  onProductoFormSubmit() {
    this.processValidation = true;
    if (this.productoForm.invalid) {
      return;
    }
    // La form es válida, ahora realiza crear o actualizar
    this.preProcessConfigurations();
    let nombre = this.productoForm.get('nombre').value.trim();
    let categoria = this.productoForm.get('categoria').value.trim();
    let estado = this.productoForm.get('estado').value.trim();
    if (this.productoUpdate === null) {
      // Manejar crear producto
      let producto = new Producto(null, nombre, estado, categoria);
      this.proService.createProducto(producto)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getProductos();
          this.backToCreateProducto();
        });
    } else {
      // Manejar la actualizacion del producto
      let producto = new Producto(this.productoUpdate, nombre, estado, categoria);
      this.proService.updateProducto(producto)
        .subscribe(succesCode => {
          this.statusCode = succesCode;
          this.getProductos();
          this.backToCreateProducto();
        },
          errorCode => this.statusCode = errorCode);
    }
  }

  // Cargar categoría por id para editar
  loadProductoToEdit(id: string) {
    this.preProcessConfigurations();
    this.proService.getProductoById(id)
      .subscribe(producto => {
        this.productoUpdate = producto.id;
        this.productoForm.setValue({nombre: producto.nombre, categoria: producto.categoria, estado: producto.estado});
        this.processValidation = true;
        this.requesrProcessing = false;
      });
  }

  // Eliminar Categoria
  deleteProducto(id: string) {
    this.preProcessConfigurations();
    this.proService.deleteProducto(id)
      .subscribe(succesCode => {
        this.statusCode = succesCode;
        this.getProductos();
        this.backToCreateProducto();
      },
        errorCode => this.statusCode = errorCode);
  }

  // Realizar configuraciones de procesamiento preliminares
  preProcessConfigurations() {
    this.statusCode = null;
    this.requesrProcessing = true;
  }

  // Go back from update to create
  backToCreateProducto() {
    this.productoUpdate = null;
    this.productoForm.reset();
    this.processValidation = false;
  }
}
