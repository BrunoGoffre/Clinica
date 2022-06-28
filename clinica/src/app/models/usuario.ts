export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    DNI: string;
    edad: string;
    obraSocial: string;
    especialidad: string;
    email: string;
    password: string;
    rol: string;
    activo: string;
    dias: Array<string>;
    desde: string;
    hasta: string;
    imageURL1: string;
    imageURL2: string;
}
