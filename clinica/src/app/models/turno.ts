import { Especialista } from "./especilista";
import { Usuario } from "./usuario";

export interface turno {
    fecha: string;
    hora: string;
    DNI: string;
    especialista: Usuario;
    obraSocial: string;
    completado: boolean;
    resenia: string;
    EncuestaCompletada: boolean;
}