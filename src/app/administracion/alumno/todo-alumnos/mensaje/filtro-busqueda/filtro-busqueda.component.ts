import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlumnoService } from 'src/app/_services/alumno.service';
import { AlumnoRequest } from 'src/app/_model/alumnoRequest';
import { Alumno } from 'src/app/_model/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnoFiltroRequest } from '../../../../../_model/alumnoFiltroRequest';


@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.sass']
})

export class FiltroBusquedaComponent {
    action: string;
    dialogTitle: string;
    alumnoForm: FormGroup;
    alumno: AlumnoRequest;
    ciclo = []
    dataArray: Alumno[];
    alumnoFiltroRequest!: AlumnoFiltroRequest;
    datos: MatTableDataSource<Alumno>;
    sort: any;

    constructor(
      public dialogRef: MatDialogRef<FiltroBusquedaComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public alumnoService: AlumnoService,
      private fb: FormBuilder
    ) {
      
      this.action = data.action;
      this.dialogTitle = "Buscar Alumno";
      this.alumno = new AlumnoRequest();
      this.alumnoForm = this.createContactForm();
    }
    formControl = new FormControl("", [
      //Validators.required,
      // Validators.email,
    ]);
    getErrorMessage() {
      return this.formControl.hasError("required")
        ? "Required field"
        : this.formControl.hasError("expediente")
        ? "Not a valid clave"
        : "";
    }
  
    createContactForm(): FormGroup {
        return this.alumnoForm = this.fb.group({
        expediente: [this.alumno.expediente],
        nombre: [this.alumno.nombre],
        curp: [this.alumno.curp],
        correo: [this.alumno.correo],
        idCiclo: [this.alumno.idCiclo]
      });
    }
    submit() {
      // emppty stuff
    }
    onNoClick(): void {
      this.dialogRef.close()
    }
    ngOnInit(){
      this.filtrarCiclo();
    }

    filtrarCiclo(){
      this.alumnoService.consultarTodos().subscribe(data => {
        this.datos = new MatTableDataSource(data.list); 
        this.datos.sort = this.sort
        
          data.list.forEach((element) => {
            let ciclo:string = (element.idCiclo)
            this.ciclo.push(ciclo);
            
          }); 
          //item actual del array eindice del item actual del array
          let ciclos = this.ciclo.filter((value, index) => {
            return this.ciclo.indexOf(value) === index;
            
          })
          
          ciclos.sort();
          this.ciclo = ciclos;
      });
    }

    public confirmarBusqueda(): void {
      this.alumnoService.buscarAlumno(this.alumnoForm.value).subscribe(data=>{
        let datos = data.list
        //console.log(data)
        this.dialogRef.close({datos: data.list})
      }); 
    }

}
