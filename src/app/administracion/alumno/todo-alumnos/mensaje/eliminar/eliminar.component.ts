import { Component, OnInit } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Alumno } from 'src/app/_model/alumno';
import { AlumnoService } from 'src/app/_services/alumno.service';


@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.sass']
})
export class EliminarComponent {

  alumno: Array<Alumno>

  constructor(
    public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
    public alumnoService: AlumnoService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  confirmDelete(i: number): void {
    this.alumnoService.eliminarAlumno(i).subscribe({
      
    });
  }

}
