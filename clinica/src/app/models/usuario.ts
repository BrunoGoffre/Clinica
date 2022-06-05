export class Paciente {
    nombre: string;
    apellido: string;
    DNI: string;
    obraSocial: string;
    email: string;
    password: string;
    imaganesPerfil: Array<any>;

    constructor(
        nombre: string,
        apellido: string,
        DNI: string,
        obraSocial: string,
        email: string,
        password: string,
        imaganesPerfil: Array<any>
    ) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.DNI = DNI;
        this.obraSocial = obraSocial;
        this.email = email;
        this.password = password;
        this.imaganesPerfil = imaganesPerfil;
    }
}