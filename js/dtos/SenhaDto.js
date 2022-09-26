class SenhaDto{
    constructor(senha){
        this.password = senha;
        this.data = new Date(Date.now()).toISOString();
    }

    serializar(){
        return JSON.stringify(this);
    }
}

export { SenhaDto }