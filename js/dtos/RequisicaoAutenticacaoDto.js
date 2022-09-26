class RequisicaoAutenticacaoDto{
    constructor(
        usuario,
        sistema,
        guid,
        senhaCriptografada
            )
        {
            this.usuario = usuario,
            this.sistema = sistema,
            this.guidId = guid,
            this.usuarioSenhaRequest = senhaCriptografada
        }

    serializar(){
        return JSON.stringify(this);
    }
}

export { RequisicaoAutenticacaoDto }