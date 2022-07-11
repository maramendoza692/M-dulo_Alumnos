import { Ciclo } from "./ciclo";
import { Profesor } from "./profesor";
import { AluMat } from './aluMat';

export class Materia{
    id: number;
    clave: string;
    nombre: string;
    estatus: number;
    profesor: Profesor;
    calificacion: AluMat;
    idCiclo: Ciclo;
}