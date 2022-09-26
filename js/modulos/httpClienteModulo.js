const httpClienteModulo = () => {
    
    var postJsonAsync = async (url, corpo) => 
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
            console.log("Erro na requisição :"+url);
            return 'Erro na requisição';
        }
    }

    var postJsonAsync = async (url, corpo, jwtToken) => 
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
            console.log("Erro na requisição :"+url);
            return 'Erro na requisição';
        }
    }

    const getJsonAsync = (url) =>
    {
        throw 'Função não implementada';
    }


    const putJsonAsync = (url, corpo) =>
    {
        throw 'Função não implementada';
    }


    const deleteAsync = (url) =>
    {
        throw 'Função não implementada';
    }

    return {
        postJsonAsync,
        getJsonAsync,
        putJsonAsync,
        deleteAsync,
    };
};

export { httpClienteModulo };
