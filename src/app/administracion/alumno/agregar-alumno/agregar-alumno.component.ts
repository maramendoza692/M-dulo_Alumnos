import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlumnoService } from '../../../_services/alumno.service';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.sass']
})
export class AgregarAlumnoComponent {

  alumnoForm: FormGroup;
  hide3 = true;
  agree3 = false;
 
  constructor(private form: FormBuilder, private http:HttpClient ,private alumnoService:AlumnoService ) {
    this.alumnoForm = this.form.group({  
      expediente:['', Validators.required],
      nombre:['',Validators.required ],
      curp:['',Validators.required],
      genero:['',Validators.required],
      correo: ['',Validators.required],
      estatus:['',Validators.required],
      idCiclo:['',Validators.required]
      });
  }
  
  public guardarAlumno ():void{
    
    this.alumnoService.guardarAlumno(this.alumnoForm.value).subscribe(resp =>{
      //Reiniciar formulario al guardar
      this.alumnoForm.reset();
      alert("Guardado");
    })
  }

}
