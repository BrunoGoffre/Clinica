import { Usuario } from "./usuario";

export interface turno {
    id: string;
    fecha: string;
    hora: string;
    usuario: Usuario
    especialista: Usuario;
    estado: string;
    resenia: string;
    EncuestaCompletada: boolean;
}