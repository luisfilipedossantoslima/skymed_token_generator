import { HttpClienteClass } from "./httpClienteModuloClass.js";
import { ArmazenamentoLocalModuloClass } from "./armazenamentoLocalModuloClass.js";
import { ValidacaoModuloClass } from "./validacaoModuloClass.js";
import { PgpModuloClass } from "./pgpModuloClass.js";
import { SenhaDto } from "../dtos/SenhaDto.js";
import { RequisicaoAutenticacaoDto } from "../dtos/RequisicaoAutenticacaoDto.js";
import { DOMINIO } from "../enums/DominioEnum.js"
import { CAMPOS } from "../enums/CamposEnum.js"

class RotinaDeAutenticacaoClass
{
    constructor(
        url,
        elementoLogs,
        usuario,
        senha,
        sistema,
        guid,
        elementoToken,
        elementoEmpresaUnidades
    )
    {
        this.url = url;
        this.elementoLogs = elementoLogs;
        this.usuario = usuario;
        this.senha = senha;
        this.sistema = sistema;
        this.guid = guid;
        this.elementoToken = elementoToken;
        this.elementoEmpresaUnidades = elementoEmpresaUnidades;
        this._armazenamentoLocal = new ArmazenamentoLocalModuloClass();
        this._clientehttp = new HttpClienteClass();
        this._validacao = new ValidacaoModuloClass();
        this._pgp = new PgpModuloClass();
    }

    dominio;
    chavePublica;
    senhaCriptografada;
    respostaAutenticacao;
    respostaBuscarUnidades;

    selecionarDominio(){
        this.dominio = this.url == 1? DOMINIO.DESENVOLVIMENTO:DOMINIO.PRODUCAO;
        this.cadastrarLog("Domínio utilizado:" + this.dominio);
    }

    validacoes(){
        this._validacao.campoObrigatorio(CAMPOS.USUARIO, this.usuario);
        this._validacao.campoObrigatorio(CAMPOS.SISTEMA, this.sistema);
        this._validacao.campoObrigatorio(CAMPOS.SENHA, this.senha);
        this._validacao.campoObrigatorio(CAMPOS.GUID, this.guid);
    }

    async buscarChavePublica(){
        const respostaChavePublica = await this._clientehttp.getJsonAsync(this.dominio+"/Auth/GetKeys/"+this.guid);
        this.chavePublica = respostaChavePublica.dados[0].valorChave;
        this.cadastrarLog("Chave pública:"+ this.chavePublica);
    }

    async criptografarSenha(){
        const conteudoParaCriptografar = new SenhaDto(this.senha);
        this.senhaCriptografada = await this._pgp.criptografarAsync(conteudoParaCriptografar, this.chavePublica);
        this.cadastrarLog("Senha Criptografada:"+this.senhaCriptografada);
    }

    async autenticar(){
        const requisicaoAutenticacao = new RequisicaoAutenticacaoDto(this.usuario, this.sistema, this.guid, this.senhaCriptografada);
        this.respostaAutenticacao = await this._clientehttp.postJsonAsync(this.dominio+"/Auth/Autentication",requisicaoAutenticacao);
        this._armazenamentoLocal.salvar("token",this.respostaAutenticacao.dados[0]);
        this.cadastrarLog("Resposta da autenticação:"+JSON.stringify(this.respostaAutenticacao));
    }

    async buscarUnidades(){
        this.respostaBuscarUnidades = await this._clientehttp.getJsonAsync(this.dominio+"/Empresa/Get/UnidadesPorGuid/"+this.guid, this._armazenamentoLocal.ler("token"));
        this.cadastrarLog("busca de unidades executada com sucesso!");
    }
    
    async mostrarNomeDaEmpresaEUnidades(){
        this._armazenamentoLocal.salvar('empresa',this.respostaBuscarUnidades.id);
        this.respostaBuscarUnidades.empresaUnidades.forEach(
            (unidade,i)=>{
                let nome = `${this.respostaBuscarUnidades.nome} - ${unidade.nome}`;
                this.elementoEmpresaUnidades.append(this.gerarElementoOption(nome, unidade.id));
            }
        );
    }
    
    gerarElementoOption(chave, valor){
        return `<option value="${valor}">${chave}</option>`;
    }

    limparLog(){
        this.elementoLogs.val("");
    }

    cadastrarLog(mensagem){
        this.elementoLogs.val(this.elementoLogs.val()+"\n\n"+mensagem);
    }
};

export { RotinaDeAutenticacaoClass };
