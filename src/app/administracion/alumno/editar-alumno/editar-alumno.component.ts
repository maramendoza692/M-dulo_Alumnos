import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../../../_services/alumno.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.sass']
})
export class EditarAlumnoComponent {

  alumnoForm: FormGroup;
  formdata = {
    expediente: "Expendiente",
    nombre: "Nombre Alumno",
    curp: "CURP",
    genero: "Genero",
    correo:"Correo",
    estatus: "Estatus",
    ciclo: "Ciclo id"
  };

  constructor(private fb:FormBuilder,
              private alumnoService: AlumnoService)
               {this.alumnoForm = this.createContactForm()}

  createContactForm():FormGroup{
    return this.fb.group({
      expediente: [this.formdata.expediente, [Validators.required]],
      nombre: [this.formdata.nombre,[Validators.required]],
      curp: [this.formdata.curp,[Validators.required]],
      genero: [this.formdata.genero,[Validators.required]],
      correo: [this.formdata.correo,[Validators.required]],
      estatus: [this.formdata.estatus,[Validators.required]],
      ciclo: [this.formdata.ciclo,[Validators.required]]
    });
  }    
   
  editarAlumno(){

  }
  
}