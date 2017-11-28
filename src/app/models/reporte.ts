export class Reporte {
  constructor(public id: number, public idSolicitante: number, public nomProducto: string,
              public fechaPrestamo: Date, public fechaDevolucion: Date) { }
}
