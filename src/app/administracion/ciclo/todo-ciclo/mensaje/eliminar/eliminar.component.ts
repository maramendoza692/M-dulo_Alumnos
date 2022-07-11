import { Component, NgModule, OnInit } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Ciclo } from 'src/app/_model/ciclo';
import { CicloService } from 'src/app/_services/ciclo.service';



@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.sass']
})
export class EliminarComponent {

  ciclo: Array<Ciclo>

  constructor(
    public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ciclo,
    public cicloService: CicloService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*confirmDelete(id:number): void {
    this.cicloService.eliminarCiclo(this.data.id).subscribe(data =>{
      console.log('Se ha eliminado Correctamente')
      let index = this.ciclo.indexOf
    },error =>{
      console.log('error');
    }
    
    )
  }*/
  confirmDelete(i: number): void {
    this.cicloService.eliminarCiclo(i).subscribe(ciclo =>{
     
    });
  }
}
