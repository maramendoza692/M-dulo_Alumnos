import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { Alumno } from '../_model/alumno';
import { Response } from "../_model/response";
import { AlumnoFiltroRequest } from '../_model/alumnoFiltroRequest';
import { AlumnoRequest } from '../_model/alumnoRequest';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends UnsubscribeOnDestroyAdapter{
  private readonly API_URL = "assets/data/clients.json";
  dialogData: any;
  dataChange: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([]);
  isTblLoading = true;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  alumno = new Alumno();

  constructor(private http:HttpClient) {super(); }
    
  getDialogData() {
    return this.dialogData;
  }

  public consultarTodos():Observable<Response<Alumno>>{
    const url = "http://localhost:8081/alumno/consultarTodos";
    
    return this.http.get<Response<Alumno>>(url,
      {headers: new HttpHeaders().append("Content-Type","application/json")});
  }

  consultarAlumnoPorId(idAlumno: number): Observable<Alumno> {
    const url = "http://localhost:8081/alumno/consultarAlumnoPorId/" +  idAlumno

    return this.http.get<Alumno>(url);
  }
  
  guardarAlumno(alumno: AlumnoRequest): Observable<Response<Alumno>> {
    const url = "http://localhost:8081/alumno/guardarAlumno"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Alumno>>(url,alumno)
  }

  editarAlumno(alumno: Alumno):Observable<Response<Alumno>>{
    const url = 'http://localhost:8081/alumno/actualizarAlumno';


    return this.http.put<Response<Alumno>>(url,alumno)
  }
  
  eliminarAlumno(idAlumno: number): Observable<number> {
    const url = "http://localhost:8081/alumno/borrarAlumnoPorId/" +  idAlumno

    return this.http.delete<number>(url);
  }

  buscarAlumno(filtro: AlumnoFiltroRequest): Observable<Response<Alumno>> {
    const url = "http://localhost:8081/alumno/buscarAlumno"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Alumno>>(url,filtro)
  }

  get data(): Alumno[] {
    return this.dataChange.value;
  }
}
