import { Component, OnInit } from '@angular/core';
import { CicloService } from '../../_services/ciclo.service';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.sass']
})
export class CicloComponent implements OnInit {

  //obtener métodos de service
  constructor(private cicloService:CicloService) { }

  ngOnInit(): void {
    console.log("Entró al método")
    //se llama al método desde service
    this.consultarTodos();
  }

  
  public consultarTodos(){
    
 }

 public editarCiclo(){

 }

 public guardarCiclo(){

 }

}
