import {Component, OnInit} from '@angular/core';
import {Reporte} from '../models/reporte';
import {ReporteService} from '../services/reporte.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  title = 'Reporte de Prestamos';
  reportes: Reporte[];
  statusCode: number;
  requestProcessing = false;
  reporteUpdate = null;
  processValidation = false;

  reporteForm = new FormControl({
    idSolicitante: new FormControl('', Validators.required),
    idProducto: new FormControl('', Validators.required)
  });

  constructor(private repService: ReporteService) {
  }

  ngOnInit(): void {
    this.getReportes();
    console.log(this.reportes);
  }

  getReportes() {
    this.repService.getReporte()
      .subscribe(
        data => this.reportes = data,
        errorCode => this.statusCode = errorCode);
  }

  onReporteFormSubmit() {
    this.processValidation = true;
    if (this.reporteForm.invalid) {
      return;
    }

    this.preProcessConfiguration();
    let idSolicitante = this.reporteUpdate.get('idSolicitante').value.trim();
    let idProducto = this.reporteUpdate.get('idProducto').value.trim();
    if (this.reporteUpdate === null) {

    } else {
      let reporte = new Reporte(this.reporteUpdate, idSolicitante, null, null, null);
    }
  }

  preProcessConfiguration() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  backToReporte() {
    this.reporteUpdate = null;
    this.reporteForm.reset();
    this.processValidation = false;
  }
}
