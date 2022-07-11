import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CicloService } from "src/app/_services/ciclo.service";
import { AgregarCicloComponent } from "./agregar-ciclo/agregar-ciclo.component";
import { EditarCicloComponent } from './editar-ciclo/editar-ciclo.component';
import { EliminarComponent } from './todo-ciclo/mensaje/eliminar/eliminar.component';
import { FormularioMensajeComponent } from './todo-ciclo/mensaje/formulario-mensaje/formulario-mensaje.component';
import { TodoCicloComponent } from './todo-ciclo/todo-ciclos.component';
import { FiltroBusquedaComponent } from './todo-ciclo/mensaje/filtro-busqueda/filtro-busqueda.component';


@NgModule({
    declarations:[
        //Componentes
        AgregarCicloComponent,
        EditarCicloComponent,
        EliminarComponent,
        FormularioMensajeComponent,
        TodoCicloComponent,
        FiltroBusquedaComponent
        
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatSortModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTooltipModule,
        MatTableExporterModule,
        ComponentsModule,
        SharedModule,
    ],
    providers:[CicloService]
})

export class CiclosModule{}