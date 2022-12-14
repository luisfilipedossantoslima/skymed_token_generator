class SenhaDto{
    constructor(senha){
        this.password = senha;
        this.data = new Date(Date.now()-60*1000).toISOString();
    }

    serializar(){
        return JSON.stringify(this);
    }

}

export { SenhaDto }