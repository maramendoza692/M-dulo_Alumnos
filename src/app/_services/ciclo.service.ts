import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams,HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";


import {Ciclo }from "../_model/ciclo";
import {Response} from "../_model/response";
import { CicloFiltroRequest } from '../_model/cicloFiltroRequest';


@Injectable({
  providedIn: 'root'
})
export class CicloService extends UnsubscribeOnDestroyAdapter{
  private readonly API_URL = "assets/data/clients.json";
  dialogData: any;
  dataChange: BehaviorSubject<Ciclo[]> = new BehaviorSubject<Ciclo[]>([]);
  isTblLoading = true;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ciclo = new Ciclo();



  constructor(private http:HttpClient) {super(); }
    
  getDialogData() {
    return this.dialogData;
  }

  public consultarTodos():Observable<Response<Ciclo>>{
    const url = "http://localhost:8081/ciclo/consultarTodos";
    
    return this.http.get<Response<Ciclo>>(url,
      {headers: new HttpHeaders().append("Content-Type","application/json")});
  }

  guardarCiclo(ciclo: Ciclo): Observable<Response<Ciclo>> {
    const url = "http://localhost:8081/ciclo/guardarCiclo"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Ciclo>>(url,ciclo)
  }

  editarCiclo(ciclo: Ciclo):Observable<Response<Ciclo>>{
    const url = 'http://localhost:8081/ciclo/actualizarCiclo';


    return this.http.put<Response<Ciclo>>(url, ciclo)
  }
  
  eliminarCiclo(idCiclo: number): Observable<number> {
    const url = "http://localhost:8081/ciclo/borrarCicloPorId/" +  idCiclo

    return this.http.delete<number>(url);
  }

  buscarCiclo(filtro: CicloFiltroRequest): Observable<Response<Ciclo>> {
    const url = "http://localhost:8081/ciclo/buscarCiclo"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Ciclo>>(url,filtro)
  }

  get data(): Ciclo[] {
    return this.dataChange.value;
  }


}
