import { Component, Inject, ViewChild} from '@angular/core';
import {FormControl,FormGroup,FormBuilder,} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CicloService } from 'src/app/_services/ciclo.service';
import { Ciclo } from 'src/app/_model/ciclo';
import { CicloFiltroRequest } from '../../../../../_model/cicloFiltroRequest';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.sass']
})
export class FiltroBusquedaComponent {
  action: string;
  dialogTitle: string;
  cicloForm: FormGroup;
  ciclo: CicloFiltroRequest;
  fechaInicio = [];
  dataArray: Ciclo[];
  cicloFiltroRequest!:CicloFiltroRequest;
  datos: MatTableDataSource<Ciclo>;
  sort: any;


  constructor(
    public dialogRef: MatDialogRef<FiltroBusquedaComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    public cicloService: CicloService,
    private fb: FormBuilder
  ) {
    
    this.action = data.action;
    this.dialogTitle = "Buscar ciclo";
    this.ciclo = new CicloFiltroRequest();
    this.cicloForm = this.createContactForm();
  }
  formControl = new FormControl("", [

    //Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("clave")
      ? "Not a valid clave"
      : "";
  }

  createContactForm(): FormGroup {
      return this.cicloForm = this.fb.group({
      clave: [this.ciclo.clave],
      nombre: [this.ciclo.nombre],
      year: [this.ciclo.year],
    });
  }
  submit() { 
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  ngOnInit(){
    this.filtrarYear();

  }
  filtrarYear(){
    this.cicloService.consultarTodos().subscribe(data => {
      this.datos = new MatTableDataSource(data.list); 
      this.datos.sort = this.sort
      
        data.list.forEach((element) => {
          let fechaInicio = new Date(element.fechaInicio).toLocaleDateString('ko-KR').substring(0,4);
          this.fechaInicio.push(fechaInicio);
          
        });   
        //item actual del array eindice del item actual del array
        let fechas = this.fechaInicio.filter((value, index) => {
          return this.fechaInicio.indexOf(value) === index;
          
        })
        fechas.sort();
        this.fechaInicio = fechas;
        console.log(fechas)
      
    });
  }

  public confirmarBusqueda(): void {
    console.log(this.cicloForm.value)
    this.cicloService.buscarCiclo(this.cicloForm.value).subscribe(data=>{
      let datos = data.list
      //console.log(data)
      this.dialogRef.close({datos: data.list})
    }); 
  }


}
