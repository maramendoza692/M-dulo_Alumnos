import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-editar-ciclo',
  templateUrl: './editar-ciclo.component.html',
  styleUrls: ['./editar-ciclo.component.sass']
})
export class EditarCicloComponent {

  cicloForm: FormGroup;
  formdata = {
    clave: " clave ",
    nombre: " nombre ",
    estatus: " estatus ",
    periodo: " periodo ",
    fechaInicio: " fechaInicio ",
    fechaFin: " fechaFin: ",   
  };

  constructor(private fb: FormBuilder) {
    this.cicloForm = this.createContactForm();
  }
  onSubmit() {
    console.log("Form Value", this.cicloForm.value);
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      clave: [this.formdata.clave, [Validators.required]],
      nombre: [this.formdata.nombre, [Validators.required]],
      estatus: [
        this.formdata.estatus,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      periodo: [this.formdata.periodo, [Validators.required]],
      fechaInicio: [this.formdata.fechaInicio],
      fechaFin: [this.formdata.fechaFin],
    });
  }
  editarCiclo(){
    
  }

}
