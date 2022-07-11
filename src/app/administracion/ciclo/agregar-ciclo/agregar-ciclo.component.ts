import { Component } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CicloService } from '../../../_services/ciclo.service';

@Component({
  selector: 'app-agregar-ciclo',
  templateUrl: './agregar-ciclo.component.html',
  styleUrls: ['./agregar-ciclo.component.sass']
})
export class AgregarCicloComponent {
  cicloForm: FormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private form: FormBuilder, private http:HttpClient ,private cicloService:CicloService ) {
    this.cicloForm = this.form.group({
      clave: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      estatus: ["",[Validators.required]],
      periodo: ["", [Validators.required]],
      fechaInicio: ["", [Validators.required]],
      fechaFin: ["", [Validators.required]],
    });
  }
  
  public guardarCiclo ():void{
    
    this.cicloService.guardarCiclo(this.cicloForm.value).subscribe(resp =>{
      //Reiniciar formulario al guardar
      this.cicloForm.reset();
      alert("Guardado");
    })
  }

}
