import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.sass']
})
export class MateriaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("hola");
  }

}
