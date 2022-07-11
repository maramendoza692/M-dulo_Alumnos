import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from '../../authentication/page404/page404.component';
import { TodoAlumnoComponent } from "./todo-alumno/todo-alumno.component";
import { AgregarAlumnoComponent } from './agregar-alumno/agregar-alumno.component';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';

const routes:Routes = [
    {
        path: "todos-alumnos",
        component: TodoAlumnoComponent
    },
    {
        path: "agregar-alumno",
        component: AgregarAlumnoComponent
    },
    {
        path: "editar-alumno",
        component: EditarAlumnoComponent
    },
    {
        path: "**", component: Page404Component
    }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AlumnoRoutingModule{}
