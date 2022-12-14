class SenhaDto{
    FATOR_DE_CORRECAO_HORA = 60*1000;
    constructor(senha){
        this.password = senha;
        this.data = new Date(Date.now()-FATOR_DE_CORRECAO_HORA).toISOString();
    }

    serializar(){
        return JSON.stringify(this);
    }

}

export { SenhaDto }