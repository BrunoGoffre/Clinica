import { turno } from "./turno";
import { Usuario } from "./usuario";

export interface encuesta {
    id: string;
    opinion: string;
    professionalism: string;
    recomendable: number;
    stars: number;
    usuario: Usuario;
    turno: turno;
    willComeBack: boolean;
    date: string;
}