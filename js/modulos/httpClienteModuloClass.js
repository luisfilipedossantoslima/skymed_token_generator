class HttpClienteClass
{
    postJsonAsync = async (url, corpo) => 
    {
        let cabecalhos = new Headers();
        cabecalhos.append("accept", "application/json");
        cabecalhos.append("Content-Type", "application/json");

        let configuracoesRequisicao = {
            method: 'POST',
            headers: cabecalhos,
            body: JSON.stringify(corpo),
            redirect: 'follow'
        };

        let resposta = '';

        try{
            resposta = await fetch(url, configuracoesRequisicao);
            return resposta.json();
        }catch(erro){
            return "Erro na requisição :"+url;
        }
    }

    postJsonAsync = async (url, corpo, jwtToken) => 
    {
        let cabecalhos = new Headers();
        cabecalhos.append("accept", "application/json");
        cabecalhos.append("Content-Type", "application/json");
        cabecalhos.append("Authorization", "Bearer "+jwtToken);

        let configuracoesRequisicao = {
            method: 'POST',
            headers: cabecalhos,
            body: JSON.stringify(corpo),
            redirect: 'follow'
        };

        let resposta = '';

        try{
            resposta = await fetch(url, configuracoesRequisicao);
            return resposta.json();
        }catch(erro){
            return "Erro na requisição :"+url
        }
    }

    getJsonAsync = (url) =>
    {
        throw 'Função não implementada';
    }


    putJsonAsync = (url, corpo) =>
    {
        throw 'Função não implementada';
    }


    deleteAsync = (url) =>
    {
        throw 'Função não implementada';
    }
};

export { HttpClienteClass };
