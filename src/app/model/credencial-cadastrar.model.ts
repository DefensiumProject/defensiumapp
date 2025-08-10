import { PlataformaModel } from "./plataforma.model";

export interface CredencialCadastrarModel {
    plataforma: PlataformaModel;
    descricao: string;
    usuario: string;
    senha: string;
    endereco?: string;
}