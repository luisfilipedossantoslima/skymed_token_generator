const validacaoModulo = () => {
    
    var campoObrigatorio = async (chave, valor) => 
    {
        if(valor===""){
            Swal.fire(chave+" é obrigatório")
        }

    }



    return {
        campoObrigatorio
    };
};

export { validacaoModulo };
