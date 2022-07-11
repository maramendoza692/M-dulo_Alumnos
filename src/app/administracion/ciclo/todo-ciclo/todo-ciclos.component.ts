import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Ciclo } from "src/app/_model/ciclo";
import { CicloService } from '../../../_services/ciclo.service';
import { FormularioMensajeComponent } from './mensaje/formulario-mensaje/formulario-mensaje.component';
import { FiltroBusquedaComponent } from './mensaje/filtro-busqueda/filtro-busqueda.component';
import { EliminarComponent } from "./mensaje/eliminar/eliminar.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CicloFiltroRequest } from "src/app/_model/cicloFiltroRequest";

@Component({
  selector: 'app-todo-ciclo',
  templateUrl: './todo-ciclos.component.html',
  styleUrls: ['./todo-ciclos.component.sass']
})
export class TodoCicloComponent 
extends UnsubscribeOnDestroyAdapter 
implements OnInit {
 
  displayedColumns = [
    "id",
    "clave",
    "nombre",
    "estatus",
    "periodo",
    "fechaInicio",
    "fechaFin",
    "actions"
  ];

  cicloForm: FormGroup;
  exampleDatabase: CicloService;
  //dataSource: ExampleDataSource;
  selection = new SelectionModel<Ciclo>(true, []);
  index: number;
  id: number;
  ciclo: Ciclo | null;
  //Traer los datos desde el modelo ciclo.ts
  dataArray:Ciclo[];
  public form:FormGroup;

  constructor(
            public httpClient: HttpClient,
            public dialog:MatDialog,
            public cicloService: CicloService,
            private snackbar:MatSnackBar,
            private formBuilder:FormBuilder
    ) { 
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.consultarTodos();
    
    this.form = this.formBuilder.group({  
    clave:['',[Validators.minLength(4), Validators.maxLength(6),Validators.required]],
    nombre:['',Validators.required],
    estatus:['',Validators.required],
    periodo:['',Validators.required],
    fechaInicio: ['',Validators.required],
    fechaFin:['',Validators.required]
    });
  }
  refresh() {
    this.consultarTodos();
  }

  public consultarTodos(){
    this.cicloService.consultarTodos().subscribe({

      next: data => {
        this.dataArray = data.list;
       
      }
      
     
    });
    
  }

  guardarCiclo(){

    const dialogRef = this.dialog.open(FormularioMensajeComponent, {
      data: {
        ciclo: this.ciclo,
        action: "add",
      },

    });
    
     this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
         
        this.consultarTodos();
         this.showNotification(
          "snackbar-success",
           "Guardado correctamente...!!!",
           "bottom",
           "center"
        );
        
      }
    });
  }
  buscarCiclo(){

    const dialogRef = this.dialog.open(FiltroBusquedaComponent, {
      data: {
        ciclo: this.ciclo,
        action: "search",
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result.datos)
      if(result.datos){
      this.dataArray = result.datos;
      this.showNotification(
        "snackbar-success",
         "Consulta correcta...!!!",
         "bottom",
         "center"
      );
      } 
    });
  }

  editarCiclo(row) {
    
    const dialogRef = this.dialog.open(FormularioMensajeComponent, {
      data: {
        ciclo: row,
        action: "edit",
      },
    });
    
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
   
      if (result === 1) {
        this.cicloService.editarCiclo(row).subscribe(resp =>{    
          this.consultarTodos();
          this.showNotification(
            "snackbar-success",
            "Editado correctamente...!!!",
            "bottom",
            "center"
          );
        
        
        })
        
      }
    });
  }


  eliminarCiclo(i: number, ciclo) {
    this.index = i
    this.ciclo = ciclo.id

    const dialogRef = this.dialog.open(EliminarComponent, {
      height: "270px",
      width: "400px",
      data: ciclo,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
           
          this.consultarTodos();
          this.showNotification(
            "snackbar-danger",
            "Eliminado correctamente!!!",
            "bottom",
            "center"
          );
      }
    });
  }
  

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  edit(Data: Ciclo){
    
  }
}


 
  


