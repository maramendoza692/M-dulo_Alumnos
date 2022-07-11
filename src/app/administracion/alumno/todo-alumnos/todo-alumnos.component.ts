import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AlumnoService } from 'src/app/_services/alumno.service';
import { Alumno } from '../../../_model/alumno';
import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioMensajeComponent } from './mensaje/formulario-mensaje/formulario-mensaje.component';
import { FiltroBusquedaComponent } from './mensaje/filtro-busqueda/filtro-busqueda.component';
import { EliminarComponent } from './mensaje/eliminar/eliminar.component';
import { AlumnoRequest } from '../../../_model/alumnoRequest';
import { AlumnoFiltroRequest } from 'src/app/_model/alumnoFiltroRequest';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-todo-alumnos',
  templateUrl: './todo-alumnos.component.html',
  styleUrls: ['./todo-alumnos.component.sass']
})
export class TodoAlumnosComponent 
extends UnsubscribeOnDestroyAdapter 
implements OnInit {

  displayedColumns = [
    "expediente",
    "nombre",
    "curp",
    "genero",
    "correo",
    "estatus",
    "idCiclo",
    "actions"
  ];

  exampleDatabase: AlumnoService;
  //dataSource: ExampleDataSource;
  selection = new SelectionModel<Alumno>(true, []);
  index: number;
  id: number;
  alumno: Alumno | null; 
  //Traer los datos desde el modelo ciclo.ts
  dataArray:Alumno[];
  form: FormGroup;
  cargando:boolean = true;
  ciclo = []
  alumnoFiltroRequest!: AlumnoFiltroRequest;
  datos: MatTableDataSource<Alumno>;
   
  //public form:FormGroup;

  constructor(public httpClient: HttpClient,
    public dialog:MatDialog,
    public alumnoService: AlumnoService,
    private snackbar:MatSnackBar,
    private formBuilder:FormBuilder
  ) { 
  super();
  } 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.consultarTodos();
    
    this.form = this.formBuilder.group({  
      expediente:['', Validators.required],
      nombre:['',Validators.required ],
      curp:['',Validators.required],
      genero:['',Validators.required],
      correo: ['',Validators.required],
      estatus:['',Validators.required],
      idCiclo:['',Validators.required]
      });

    this.seleccionarCiclo();
  }

  refresh() {
    this.consultarTodos();
  }

  public consultarTodos(){
    this.alumnoService.consultarTodos().subscribe(({list})=>{

    this.dataArray = list
     
    });
  }

  guardarAlumno(){

    const dialogRef = this.dialog.open(FormularioMensajeComponent, {
      data: {
        alumno: this.alumno,
        action: "add",
      }
      
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

  buscarAlumno(){

    const dialogRef = this.dialog.open(FiltroBusquedaComponent, {
      data: {
        alumno: this.alumno,
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

  editarAlumno(alumno?: Alumno, idCiclo?: string ) {
    let alu = alumno != null ? alumno: new Alumno();
    alu.idCiclo = idCiclo;

    const dialogRef = this.dialog.open(FormularioMensajeComponent, {
      data: {
        alumno: alu,
        action: "edit",
      },
    });
    
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log("Editaaaaar")
      if (result === 1) {
        //this.alumnoService.editarAlumno(result).subscribe(resp =>{    
          this.consultarTodos();
          this.showNotification(
            "snackbar-success",
            "Editado correctamente...!!!",
            "bottom",
            "center"
          );
        
        
        //})
        
      }
    });
  }

  eliminarAlumno(i: number, alumno) {
    this.index = i
    this.id = alumno.ciclo

    const dialogRef = this.dialog.open(EliminarComponent, {
      height: "270px",
      width: "400px",
      data: alumno,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        
      //  this.alumnoService.eliminarAlumno(i).subscribe(resp =>{    
          this.consultarTodos();
          this.showNotification(
            "snackbar-danger",
            "Eliminado correctamente!!!",
            "bottom",
            "center"
          );
       // })
      }
    });
  }

  
  seleccionarCiclo(){
    this.alumnoService.consultarTodos().subscribe(data => {
      this.datos = new MatTableDataSource(data.list); 
      this.datos.sort = this.sort
      
        data.list.forEach((element) => {
          let ciclo:string = (element.idCiclo)
          this.ciclo.push(ciclo);
          
        }); console.log("filtroooo")  
        //item actual del array eindice del item actual del array
        let ciclos = this.ciclo.filter((value, index) => {
          return this.ciclo.indexOf(value) === index;
          
        })
        console.log("filtroooox2")
        ciclos.sort();
        this.ciclo = ciclos;
        console.log(ciclos)
       
      
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
  


  

}
