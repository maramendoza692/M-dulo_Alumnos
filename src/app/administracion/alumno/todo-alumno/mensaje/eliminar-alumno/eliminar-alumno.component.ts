import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/_model/alumno';
import { AlumnoService } from 'src/app/_services/alumno.service';

@Component({
  selector: 'app-eliminar-alumno',
  templateUrl: './eliminar-alumno.component.html',
  styleUrls: ['./eliminar-alumno.component.sass']
})
export class EliminarComponent implements OnInit {

 
 alummno: Array<Alumno>

  constructor(
    public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
    public alumnoService:AlumnoService
  ) {}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  confirmDelete(i: number): void {
  
    this.alumnoService.eliminarAlumno(i).subscribe(alumno =>{

    })
  }
}
