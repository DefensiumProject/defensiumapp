import { PlataformaModel } from "./plataforma.model";

export interface CredencialEditarModel {
    codigo: number;
    plataforma: PlataformaModel;
    descricao: string;
    usuario: string;
    senha: string;
    endereco?: string;
}