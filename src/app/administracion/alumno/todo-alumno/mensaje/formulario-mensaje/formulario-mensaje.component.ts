import { Component, Inject } from '@angular/core';
import { formatDate } from '@angular/common' 

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlumnoService } from 'src/app/_services/alumno.service';
import { CicloService } from 'src/app/_services/ciclo.service';
import { Alumno } from 'src/app/_model/alumno';
import { AlumnoRequest } from 'src/app/_model/alumnoRequest';
import { AlumnoFiltroRequest } from 'src/app/_model/alumnoFiltroRequest';
import { MatTableDataSource } from '@angular/material/table';
import { Ciclo } from '../../../../../_model/ciclo';

@Component({
  selector: 'app-formulario-mensaje',
  templateUrl: './formulario-mensaje.component.html',
  styleUrls: ['./formulario-mensaje.component.sass']
})
export class FormularioMensajeComponent {

  action: string;
  dialogTitle: string;
  alumnoForm: FormGroup;
  alumno: Alumno;
  alumnoE: AlumnoRequest;
  ciclo = []
  dataArray: Alumno[];
  alumnoFiltroRequest!: AlumnoFiltroRequest;
  datos: MatTableDataSource<Ciclo>;
  sort: any;
   
  constructor(
    public dialogRef: MatDialogRef<FormularioMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public alumnoService: AlumnoService,
    public cicloService: CicloService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.alumno.expediente;
      this.alumno = data.alumno;
    } else {
      this.dialogTitle = "add";
      this.alumno = new Alumno();
    }
    this.alumnoForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
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
      return this.alumnoForm = this.fb.group({
      id:[this.alumno.id],
      expediente: [this.alumno.expediente,[Validators.minLength(4), Validators.maxLength(6),Validators.required]],//
      nombre: [this.alumno.nombre],
      curp: [this.alumno.curp,[Validators.minLength(18),Validators.required]],//
      genero: [this.alumno.genero],
      correo: [this.alumno.correo,[Validators.email]],//
      estatus: [this.alumno.estatus],
      idCiclo: [this.alumno.idCiclo]
       
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.seleccionarCiclo();
  }

  seleccionarCiclo(){
    this.cicloService.consultarTodos().subscribe(data => {
      this.datos = new MatTableDataSource(data.list); 
      this.datos.sort = this.sort
      
        data.list.forEach((element) => {
          let ciclo = (element.id)
          this.ciclo.push(ciclo);
          
        });  
        //item actual del array e indice del item actual del array
        let ciclos = this.ciclo.filter((value, index) => {
          return this.ciclo.indexOf(value) === index;
          
        })
        ciclos.sort();
        this.ciclo = ciclos;
        console.log(ciclos)
       
      
    });
  }

  public confirmAdd(): void {
    console.log("Ya entré")
    this.alumnoService.guardarAlumno(this.alumnoForm.value).subscribe(result =>{
      /*if(this.alumno != null && this.alumno.id <0){
        this.alumnoService.editarAlumno(this.alumnoE).subscribe();
      } else {
        this.alumnoService.guardarAlumno(this.alumnoE).subscribe();
      }*/
      
    });
  }
}
