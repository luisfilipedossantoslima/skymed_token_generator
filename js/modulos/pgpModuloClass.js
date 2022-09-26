import * as openpgp from "../libs/openpgp.min.mjs";

class PgpModuloClass
{

    criptografarAsync = async (conteudo, chavePublica) => 
    {
        const chavePublicaProtegida = await openpgp.readKey({ armoredKey: chavePublica });
        const conteudoCriptografado = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: JSON.stringify(conteudo) }),
            encryptionKeys: chavePublicaProtegida,
        });

        return conteudoCriptografado;
    }

};

export { PgpModuloClass };
