import { PlataformaModel } from "./plataforma.model";

export interface CredencialModel {
    codigo: number;
    plataforma: PlataformaModel;
    descricao: string;
    usuario: string;
    senha: string;
    endereco?: string;
    url: string;
}