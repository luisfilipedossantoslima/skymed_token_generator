function armazenamentoLocalModulo()
{
  function salvar(chave, valor){
    window.localStorage.setItem(chave, valor);
  }

  function ler(chave){
    console.log(chave)
    return localStorage.getItem(chave);
  }

  function deletar(chave){
    window.localStorage.removeItem(chave);
  }

  function deletarTodos(){
    window.localStorage.clear();
  }


    return{
      salvar,
      ler,
      deletar,
      deletarTodos
    }
}

export { armazenamentoLocalModulo };