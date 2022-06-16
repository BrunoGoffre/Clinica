import { Usuario } from "./usuario";

export interface turno {
    fecha: string;
    hora: string;
    usuario: Usuario
    especialista: Usuario;
    completado: boolean;
    resenia: string;
    EncuestaCompletada: boolean;
}