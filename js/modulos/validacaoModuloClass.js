class ValidacaoModuloClass
{
    
    campoObrigatorio = async (chave, valor) => 
    {
        if(valor===""){
            Swal.fire(chave+" é obrigatório")
        }

    }
};

export { ValidacaoModuloClass };
