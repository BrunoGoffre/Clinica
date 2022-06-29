import { HistoriaClinica } from "./Historial";
import { Usuario } from "./usuario";

export interface turno {
    id: string;
    fecha: string;
    hora: string;
    usuario: Usuario
    especialista: Usuario;
    historiaClinica?: HistoriaClinica;
    estado: string;
    resenia: string;
    EncuestaCompletada: boolean;
}