import { RotinaDeAutenticacaoClass } from "./modulos/rotinaDeAutenticacaoModuloClass.js";
import { RotinaDeAcessoModuloClass } from "./modulos/rotinaDeAcessoModuloClass.js";


class ProgramaPrincipal
{
    static async rotinaDeAutenticacao(){
        const _rotinaDeAutenticacao = new RotinaDeAutenticacaoClass(
            $('#url').val(),
            $('#logs'),
            $('#usuario').val(),
            $('#senha').val(),
            $('#sistema').val(),
            $('#guid').val(),
            $('#token'),
            $('#empresaUnidade'),
        );

        _rotinaDeAutenticacao.limparLog();
        _rotinaDeAutenticacao.selecionarDominio();
        _rotinaDeAutenticacao.validacoes();
        await _rotinaDeAutenticacao.buscarChavePublica();
        await _rotinaDeAutenticacao.criptografarSenha();
        await _rotinaDeAutenticacao.autenticar();
        await _rotinaDeAutenticacao.buscarUnidades();
        await _rotinaDeAutenticacao.mostrarNomeDaEmpresaEUnidades();
    }

    static async rotinaDeAcesso(){
        const _rotinaDeAcesso = new RotinaDeAcessoModuloClass(
            $('#url').val(),
            $('#logs'),
            $('#empresaUnidade').val(),
            'mac',
            $('#token'),
        );

        _rotinaDeAcesso.selecionarDominio();
        await _rotinaDeAcesso.acessar();
    }


}


$('#carregarUnidades').click(async () => {
    await ProgramaPrincipal.rotinaDeAutenticacao();
});

$('#gerarToken').click(async () => {
    await ProgramaPrincipal.rotinaDeAcesso();
});

$('#enviarMensagem').click(()=>{
    const init = new ProgramaPrincipal($('#logs'));
    init.enviarLogParaLuis();
});
