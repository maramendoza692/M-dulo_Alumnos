import { Component, Inject } from '@angular/core';
import { formatDate } from '@angular/common' 

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CicloService } from 'src/app/_services/ciclo.service';
import { Ciclo } from 'src/app/_model/ciclo';

@Component({
  selector: 'app-formulario-mensaje',
  templateUrl: './formulario-mensaje.component.html',
  styleUrls: ['./formulario-mensaje.component.sass']
})
export class FormularioMensajeComponent {

  action: string;
  dialogTitle: string;
  cicloForm: FormGroup;
  ciclo: Ciclo;
  
  constructor(
    public dialogRef: MatDialogRef<FormularioMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cicloService: CicloService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.ciclo.clave;
      this.ciclo = data.ciclo;
    } else {
      this.dialogTitle = "New Ciclo";
      this.ciclo = new Ciclo();
    }
    this.cicloForm = this.createContactForm();
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
      return this.cicloForm = this.fb.group({
      id:[this.ciclo.id],
      clave: [this.ciclo.clave,[Validators.minLength(4), Validators.maxLength(6),Validators.required]],
      nombre: [this.ciclo.nombre],
      estatus: [this.ciclo.estatus],
      periodo: [this.ciclo.periodo],
      fechaInicio: [this.ciclo.fechaInicio],
      fechaFin: [this.ciclo.fechaFin] 
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  
  public confirmAdd(): void {
    this.cicloService.guardarCiclo(this.cicloForm.value).subscribe();
  }

}
