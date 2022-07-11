import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { SharedModule } from "./../shared/shared.module";

import { AdministracionRoutingModule } from './administacion-routing.module';
import { CiclosModule } from "./ciclo/ciclos.module";
import { AlumnoModule } from "./alumno/alumno.module";
import { AlumnosModule } from "./alumnos/alumnos.module";
import { AlumnosComponent } from './alumnos/alumnos.component';


@NgModule({
  declarations: [
  

  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    SharedModule,
    AdministracionRoutingModule,
    CiclosModule,
    AlumnoModule,
    AlumnosModule
    
  ],
})
export class AdministracionModule {}
