import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/_services/alumno.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.sass']
})
export class AlumnoComponent implements OnInit {

  constructor(private alumnoService:AlumnoService) { }

  ngOnInit(): void {
    console.log("Entró al método")
    //se llama al método desde service
    this.consultarTodos();
  }

  public consultarTodos(){  
  }

  public agregarAlumno(){ 
  }

  public editarAlumno(){
  }

  public eliminarAlumno(){
  }

  public buscarAluno(){
  }
  

}
