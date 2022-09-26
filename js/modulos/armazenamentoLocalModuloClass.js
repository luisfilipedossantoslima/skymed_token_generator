class ArmazenamentoLocalModuloClass
{
  salvar(chave, valor){
    window.localStorage.setItem(chave, valor);
  }

  ler(chave){
    console.log(chave)
    return localStorage.getItem(chave);
  }

  deletar(chave){
    window.localStorage.removeItem(chave);
  }

  deletarTodos(){
    window.localStorage.clear();
  }
}

export { ArmazenamentoLocalModuloClass };