import { HttpClienteClass } from "./httpClienteModuloClass.js";
import { ArmazenamentoLocalModuloClass } from "./armazenamentoLocalModuloClass.js";
import { RequisicaoLoginDto } from "../dtos/RequisicaoLoginDto.js";
import { DOMINIO } from "../enums/DominioEnum.js"

class RotinaDeAcessoModuloClass
{
    constructor(
        url,
        elementoLogs,
        unidade,
        macAddress,
        elementoToken,
    ){
        this.url = url;
        this.elementoLogs = elementoLogs;
        this.unidade = unidade;
        this.macAddress = macAddress;
        this.elementoToken = elementoToken;
        this._armazenamentoLocal = new ArmazenamentoLocalModuloClass();
        this._clientehttp = new HttpClienteClass();
    }

    dominio;
    chavePublica;
    senhaCriptografada;
    respostaAutenticacao;
    respostaBuscarUnidades;

    async acessar(){
        const requisicaoLogin = new RequisicaoLoginDto(this._armazenamentoLocal.ler("empresa"),this.unidade,this.macAddress);
        let respostaLogin = await this._clientehttp.postJsonAsync(this.dominio+"/Auth/Login",requisicaoLogin, this._armazenamentoLocal.ler("token"));
        this.cadastrarLog(JSON.stringify(respostaLogin));
        this.elementoToken.val(respostaLogin.dados[0]);
        Swal.fire('Token atualizado com sucesso!')
    }

    selecionarDominio(){
        this.dominio = this.url == 1? DOMINIO.DESENVOLVIMENTO:DOMINIO.PRODUCAO;
        this.cadastrarLog("Domínio utilizado:" + this.dominio);
    }

    cadastrarLog(mensagem){
        this.elementoLogs.val(this.elementoLogs.val()+"\n\n"+mensagem);
    }

    limparLog(){
        this.elementoLogs.val("");
    }

    enviarLogParaLuis(){
        let textoFormatado = window.encodeURIComponent(this.elementoLogs.val());
        window.open("https://wa.me/+5585981599833?text="+ textoFormatado, "_blank");
        window.open('mailto:luisphilip90@gmail.com?subject=testeAuth&body='+textoFormatado);

        //https://api.whatsapp.com/send?phone=+5585981599833&text=TextoParaEnviar
    }
}

export { RotinaDeAcessoModuloClass };
