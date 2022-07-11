import { Page404Component } from "./../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AlumnoComponent } from "./alumno/alumno.component";
import {CicloComponent} from "./ciclo/ciclo.component";
import {GrupoComponent} from "./grupo/grupo.component";
import {MateriaComponent} from "./materia/materia.component";
import { AlumnosComponent } from "./alumnos/alumnos.component";

const routes: Routes = [
    {
      path: "",
      redirectTo: "alumno",
      pathMatch: "full",
    },
    {
      path: "alumno",
      loadChildren: () =>
      import("./alumno/alumno-routing.module").then((m) => m.AlumnoRoutingModule),
    },
    {
      path: "filtrobusqueda",
      component: AlumnosComponent,
    },
    {
     path: "ciclo",
     component: CicloComponent,
    },
    {
      path: "grupo",
      component: GrupoComponent,
    },
    {
      path: "materia",
      component: MateriaComponent,
    },
    {
      path: "ciclos",
      loadChildren: () =>
      import("./ciclo/ciclos-routing.module").then((m) => m.CicloRoutingModule),
    },
  

    { path: "**", component: Page404Component },
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdministracionRoutingModule {


  }
  