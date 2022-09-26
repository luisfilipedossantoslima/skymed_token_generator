import * as openpgp from "../libs/openpgp.min.mjs";

const pgpModulo = () => {

    const criptografarAsync = async (conteudo, chavePublica) => 
    {
        const chavePublicaProtegida = await openpgp.readKey({ armoredKey: chavePublica });
        const conteudoCriptografado = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: JSON.stringify(conteudo) }),
            encryptionKeys: chavePublicaProtegida,
        });

        return conteudoCriptografado;
    }

    return {
        criptografarAsync
    };
};

export { pgpModulo };
