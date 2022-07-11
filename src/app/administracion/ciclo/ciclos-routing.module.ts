import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AgregarCicloComponent } from "./agregar-ciclo/agregar-ciclo.component";
import { EditarCicloComponent } from './editar-ciclo/editar-ciclo.component';
import { TodoCicloComponent } from './todo-ciclo/todo-ciclos.component';
import { Page404Component } from '../../authentication/page404/page404.component';

const routes:Routes = [
    {
        path: "todos-ciclos",
        component: TodoCicloComponent,
    },
    {
        path: "agregar-ciclo",
        component: AgregarCicloComponent
    },
    {
        path:"editar-ciclo",
        component: EditarCicloComponent
    },
    {
        path: "**", component: Page404Component
    }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class CicloRoutingModule{}
