import { armazenamentoLocalModulo } from "./armazenamentoLocalModulo.js";

const _armazenamentoLocal = armazenamentoLocalModulo();

const arquivoModulo = () => {

    const salvarNoArmazenamentoLocal = (elemento, callback) => {
        const reader = new FileReader();
        reader.readAsBinaryString(elemento.files[0]);
        reader.onload = async (evento)=>{
        await callback(evento.target.result);
            _armazenamentoLocal.salvar('pgp',evento.target.result);
        };
    }

    const lerArquivoComoStringAsync = (elemento) => {
        return new Promise((devolva) => {
            const reader = new FileReader();
            reader.readAsBinaryString(elemento.files[0]);
            reader.onload = async (evento)=>{
                devolva(evento.target.result);
            };
        });
    }

    return{
        salvarNoArmazenamentoLocal,
        lerArquivoComoStringAsync
    }
}

export { arquivoModulo };