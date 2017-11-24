import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaService} from '../services/categoria.service';
import {Categoria} from '../models/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {

  title = 'Listado de Categorias';
  categorias: Categoria[];
  statusCode: number;
  requesrProcessing = false;
  categoriaUpdate = null;
  processValidation = false;

  // create form
  categoriaForm = new FormGroup({
    nombre: new FormControl('', Validators.required)
  });

  // create constructor to get service instance
  constructor(private catService: CategoriaService) {
  }

  // create ngOnit() and load categorias
  ngOnInit(): void {
    this.getCategorias();
    console.log(this.categorias);
  }

  // fetch all categorias
  getCategorias() {
    this.catService.getCategorias()
      .subscribe(
        data => this.categorias = data,
        errorCode => this.statusCode = errorCode);
  }

  // Handle create and update categoria
  onCategoriaFormSubmit() {
    this.processValidation = true;
    if (this.categoriaForm.invalid) {
      return; // Validación fallida, salga del método.
    }
    // La form es válida, ahora realiza crear o actualizar
    this.preProcessConfigurations();
    let nombre = this.categoriaForm.get('nombre').value.trim();
    if (this.categoriaUpdate === null) {
      // Manejar crear Categoria
      let categoria = new Categoria(null, nombre);
      this.catService.createCategoria(categoria)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getCategorias();
          this.backToCreateCategoria();
        });
    } else {
      // Manejar la categoría de actualización
      let categoria = new Categoria(this.categoriaUpdate, nombre);
      this.catService.updateCategoria(categoria)
        .subscribe(succesCode => {
          this.statusCode = succesCode;
          this.getCategorias();
          this.backToCreateCategoria();
        },
          errorCode => this.statusCode = errorCode);
    }
  }

  // Cargar categoría por id para editar
  loadCategoriaToEdit(id: string) {
    this.preProcessConfigurations();
    this.catService.getCategoriaById(id)
      .subscribe(categoria => {
          this.categoriaUpdate = categoria.id;
          this.categoriaForm.setValue({nombre: categoria.nombre});
          this.processValidation = true;
          this.requesrProcessing = false;
        },
        errorCode => this.statusCode = errorCode);
  }

  // Eliminar Categoria
  deleteCategoria(id: string) {
    this.preProcessConfigurations();
    this.catService.deleteCategoria(id)
      .subscribe(successCode => {
          this.statusCode = successCode;
          this.getCategorias();
          this.backToCreateCategoria();
        },
        errorCode => this.statusCode = errorCode);
  }

  // Realizar configuraciones de procesamiento preliminares
  preProcessConfigurations() {
    this.statusCode = null;
    this.requesrProcessing = true;
  }

  // Go back from update to create
  backToCreateCategoria() {
    this.categoriaUpdate = null;
    this.categoriaForm.reset();
    this.processValidation = false;
  }
}
