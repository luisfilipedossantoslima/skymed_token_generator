class RequisicaoLoginDto{
    constructor(
        empresa,
        unidade, 
        macAddress
            )
        {
            this.idEmpresa = empresa,
            this.idEmpresaUnidade = unidade,
            this.macAddress = macAddress
        }

    serializar(){
        return JSON.stringify(this);
    }
}

export { RequisicaoLoginDto }