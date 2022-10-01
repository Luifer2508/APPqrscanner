import { Registro } from "../models/registro.model";

export interface NewRegistro {
    registros: Registro[];
}

export interface Registros{
    format : string;
    content : string;
    type : string;
    icon : string;
    created : Date;
 }