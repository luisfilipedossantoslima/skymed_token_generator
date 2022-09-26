import { ArquivoModuloClass } from "./modulos/arquivoModuloClass.js";
import { HttpClienteClass } from "./modulos/httpClienteModuloClass.js";
import { ArmazenamentoLocalModuloClass } from "./modulos/armazenamentoLocalModuloClass.js";
import { ValidacaoModuloClass } from "./modulos/validacaoModuloClass.js";
import { PgpModuloClass } from "./modulos/pgpModuloClass.js";
import { SenhaDto } from "./dtos/SenhaDto.js";
import { RequisicaoAutenticacaoDto } from "./dtos/RequisicaoAutenticacaoDto.js";
import { RequisicaoLoginDto } from "./dtos/RequisicaoLoginDto.js";
import { DOMINIO } from "./enums/DominioEnum.js"
import { CAMPOS } from "./enums/CamposEnum.js"

class ProgramaPrincipal
{
    constructor(
        elementoLogs,
        elementoToken,
        elementoArquivo,
        macAddress, 
        usuario, 
        senha, 
        sistema, 
        guid, 
        empresa, 
        unidade, 
        url)
        {
            this.elementoLogs = elementoLogs;
            this.elementoToken = elementoToken;
            this.elementoArquivo = elementoArquivo;
            this.macAddress = macAddress;
            this.usuario = usuario;
            this.senha = senha;
            this.sistema = sistema;
            this.guid = guid;
            this.empresa = empresa;
            this.unidade = unidade;
            this.url = url;
            this._arquivo = new ArquivoModuloClass();
            this._armazenamentoLocal = new ArmazenamentoLocalModuloClass();
            this._clientehttp = new HttpClienteClass();
            this._validacao = new ValidacaoModuloClass();
            this._pgp = new PgpModuloClass();
        }

    dominio;
    chavePublica;
    senhaCriptografada;
    respostaAutenticacao;

    selecionarDominio(){
        this.dominio = this.url == 1? DOMINIO.DESENVOLVIMENTO:DOMINIO.PRODUCAO;
        this.cadastrarLog(this.dominio);
    }

    validacoes(){
        this._validacao.campoObrigatorio(CAMPOS.USUARIO, this.usuario);
        this._validacao.campoObrigatorio(CAMPOS.SISTEMA, this.sistema);
        this._validacao.campoObrigatorio(CAMPOS.SENHA, this.senha);
        this._validacao.campoObrigatorio(CAMPOS.GUID, this.guid);
        this._validacao.campoObrigatorio(CAMPOS.EMPRESA, this.empresa);
        this._validacao.campoObrigatorio(CAMPOS.UNIDADE, this.unidade);
    }

    async lerChavePublica(){
        this.chavePublica = await this._arquivo.lerArquivoComoStringAsync(this.elementoArquivo);
        this.cadastrarLog("leitura de chave pública executada com sucesso!");
    }

    async criptografarSenha(){
        const conteudoParaCriptografar = new SenhaDto(this.senha);
        this.senhaCriptografada = await this._pgp.criptografarAsync(conteudoParaCriptografar, this.chavePublica);
        this.cadastrarLog("criptografia da senha executada com sucesso!");
    }

    async autenticar(){
        const requisicaoAutenticacao = new RequisicaoAutenticacaoDto(this.usuario, this.sistema, this.guid, this.senhaCriptografada);
        this.respostaAutenticacao = await this._clientehttp.postJsonAsync(this.dominio+"/Auth/Autentication",requisicaoAutenticacao);
        this.cadastrarLog(JSON.stringify(this.respostaAutenticacao));
    }

    async acessar(){
        const requisicaoLogin = new RequisicaoLoginDto(this.empresa,this.unidade,this.macAddress);
        let respostaLogin = await this._clientehttp.postJsonAsync(this.dominio+"/Auth/Login",requisicaoLogin, this.respostaAutenticacao.dados[0]);
        this.cadastrarLog(JSON.stringify(respostaLogin));
        this.elementoToken.val(respostaLogin.dados[0]);
        Swal.fire('Token atualizado com sucesso!')
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


$('#chave').change(async (evento) => {
    const init = new ProgramaPrincipal(
            $('#logs'),
            $('#token'),
            evento.target,
            '',
            $('#usuario').val(),
            $('#senha').val(),
            $('#sistema').val(),
            $('#guid').val(),
            $('#empresa').val(),
            $('#unidade').val(),
            $('#url').val()
    );

    init.limparLog();
    init.selecionarDominio();
    init.validacoes();
    await init.lerChavePublica();
    await init.criptografarSenha();
    await init.autenticar();
    await init.acessar();
});

$('#enviarMensagem').click(()=>{
    const init = new ProgramaPrincipal($('#logs'));
    init.enviarLogParaLuis();
});

// let AUTH_USUARIO = "mateus.aguiar";
// let AUTH_SENHA = "Mateus123!";
// let AUTH_SISTEMA = "SKA";
// let AUTH_GUID = "BE7B9FA7-F1B4-4E68-9E67-E72A4D13B8F4";
// let AUTH_ID_EMPRESA = 1;
// let AUTH_ID_EMPRESA_UNIDADE = 1;
// let AUTH_DOMINIO = "https://skauth-dev.skymed.app.br/api";
// let AUTH_MAC_ADDRESS = "mac";
