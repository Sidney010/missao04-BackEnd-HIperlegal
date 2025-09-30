/***********************************************************************************************
 * Objetivo: Arquivo responsavel pelas funções para criar a API de estados e cidades
 * Data: 26/09/2025
 * Autor: Sidney
 * Versão 1.0   
 ************************************************************************************************/

//import do arquivo contatos
const dados = require('./contatos.js')
const MESSAGE_ERROR = { status: false, statuscode: 500, development: 'Sidney Campos Aragão' }

//Retorna a lista os dados de todos os usuários
const getAllContatos = function () {
    //Padrão do JSON que será o retorno
    let message = { status: true, statuscode: 200, development: 'Sidney Campos Aragão', conversas_dados: [] }

    dados.contatos['whats-users'].forEach(function (item) {
        let id = item.id
        let conta = item.account
        let apelido = item.nickname
        let data_criacao_conta = item['created-since'].start
        let data_exclusao_conta = item['created-since'].final
        let imagem_perfil = item['profile-image']
        let numero = item.number
        let imagem_fundo = item.background
        let dados_contato = { id, conta, apelido, data_criacao_conta, data_exclusao_conta, imagem_perfil, numero, imagem_fundo }
        message.conversas_dados.push(dados_contato)
    })
    if(!(message.conversas_dados.length === 0)){
        return message
    } else {
        return MESSAGE_ERROR
    }

}


//Retorna os dados da conta do profile do usuário conforme o número
const getContatosByNumber = function (profileNumber) {

    let filtroProfileNumber = profileNumber

    //Padrão do JSON que será o retorno
    let message = { status: true, statuscode: 200, development: 'Sidney Campos Aragão', profile_dados: [] }

    dados.contatos['whats-users'].forEach(function (item) {
        if (item.number === filtroProfileNumber) {
            let nome = item.account
            let nick = item.nickname
            let criacao = item['created-since'].start
            let encerramento = item['created-since'].final
            let foto = item['profile-image']
            let numero = item.number
            let cor_de_fundo = item.background
            let dados_contato = { nome, nick, foto, numero, cor_de_fundo, criacao, encerramento }
            message.profile_dados.push(dados_contato)
        }
    })
    if(!(message.profile_dados.length === 0)){
        return message
    } else {
        return MESSAGE_ERROR
    }

}
//Retorna apenas os dados pessoais de cada contato do usuário, como nome, foto e descrição conforme o número
const getDadosPessoaisConversasByNumber = function (profileNumber) {

    let filtroProfileNumber = profileNumber

    //Padrão do JSON que será o retorno
    let message = { status: true, statuscode: 200, development: 'Sidney Campos Aragão', dados_conversas: [] }

    dados.contatos['whats-users'].forEach(function (itemUser) {
        if (itemUser.number === filtroProfileNumber) {
            itemUser.contacts.forEach(function (itemContatos) {
                let nome = itemContatos.name
                let foto = itemContatos.image
                let descricao = itemContatos.description
                let dados_pessoais = { nome, foto, descricao }
                message.dados_conversas.push(dados_pessoais)
            })
        }
    })
    if(!(message.dados_conversas.length === 0)){
        return message
    } else {
        return MESSAGE_ERROR
    }

}
//Retorna todas as mensagens trocadas de uma conta de usuário conforme o número
const getMenssagesTrocadasByNumber = function (profileNumber) {

    let filtroProfileNumber = profileNumber

    //Padrão do JSON que será o retorno
    let message = { status: true, statuscode: 200, development: 'Sidney Campos Aragão', menssages_trocadas: [] }

    dados.contatos['whats-users'].forEach(function (itemUser) {
        if (itemUser.number === filtroProfileNumber) {
            itemUser.contacts.forEach(function (itemContatos) {
                itemContatos.messages.forEach(function (itemMessagens) {
                    let remetente = itemMessagens.sender
                    let conteudo = itemMessagens.content
                    let horario = itemMessagens.time
                    let dadosMensagens = { remetente, conteudo, horario }
                    message.menssages_trocadas.push(dadosMensagens)
                })
            })
        }
    })
    if(!(message.menssages_trocadas.length === 0)){
        return message
    } else {
        return MESSAGE_ERROR
    }

}
//Retorna dados como: nome, número de celular e as conversas
const getConversaUserContatoByUserAndContatoNumber = function (userNumber, contatoNumber) {
    let filtroUserNumber = userNumber
    let filtroContatoNumber = contatoNumber
    let message = { status: true, statuscode: 200, development: 'Sidney Campos Aragão', perfil: '', nome: '', numero_de_celular: '', conversas: [] }

    dados.contatos['whats-users'].forEach(function (itemUser) {
        if (itemUser.number === filtroUserNumber) {
            message.perfil = itemUser.account
            itemUser.contacts.forEach(function (itemContatos) {
                if (itemContatos.number === filtroContatoNumber) {
                    message.nome = itemContatos.name
                    message.numero_de_celular = itemContatos.number
                    itemContatos.messages.forEach(function (itemMessagens) {
                        let remetente = itemMessagens.sender
                        let conteudo = itemMessagens.content
                        let horario = itemMessagens.time
                        let dadosMensagens = { remetente, conteudo, horario }
                        message.conversas.push(dadosMensagens)
                    })
                }
            })
        }
    })
    if(!(message.conversas.length === 0||message.perfil === ""|| message.nome === ""|| message.numero_de_celular === "")){
        return message
    } else {
        return MESSAGE_ERROR
    }

}
//Retorna dados como: nome, número de celular e as conversas
const getFilterConversaUserContatoByUserAndContatoNumber = function (userNumber, contatoNumber, palavraChave) {
    let filtroUserNumber = userNumber
    let filtroContatoNumber = contatoNumber
    let filtroPalavraChave = palavraChave
    let message = { status: true, statuscode: 200, development: 'Sidney Campos Aragão', perfil: '', nome: '', numero_de_celular: '', conversas_com_palavras_chaves: [] }

    dados.contatos['whats-users'].forEach(function (itemUser) {
        if (itemUser.number === filtroUserNumber) {
            message.perfil = itemUser.account
            itemUser.contacts.forEach(function (itemContatos) {
                if (itemContatos.number === filtroContatoNumber) {
                    message.nome = itemContatos.name
                    message.numero_de_celular = itemContatos.number
                    itemContatos.messages.forEach(function (itemMessagens) {
                        if(itemMessagens.content.toLowerCase().includes(filtroPalavraChave.toLowerCase())){
                        let remetente = itemMessagens.sender
                        let conteudo = itemMessagens.content
                        let horario = itemMessagens.time
                        let dadosMensagens = { remetente, conteudo, horario }
                        message.conversas_com_palavras_chaves.push(dadosMensagens)
                        }
                    })
                }
            })
        }
    })
    if(!(message.conversas_com_palavras_chaves.length === 0|| message.perfil === ''|| message.nome === ""|| message.numero_de_celular === "")){
        return message
    } else {
        return MESSAGE_ERROR
    }
}

module.exports = {
    getAllContatos,
    getContatosByNumber,
    getDadosPessoaisConversasByNumber,
    getMenssagesTrocadasByNumber,
    getConversaUserContatoByUserAndContatoNumber,
    getFilterConversaUserContatoByUserAndContatoNumber
}
// console.log(getAllContatos())
// console.log(getContatosByNumber('11987876567'))
// console.log(getDadosPessoaisConversasByNumber('11987876567'))
// console.log(getMenssagesTrocadasByNumber('11987876567'))
// console.log(getConversaUserContatoByUserAndContatoNumber('11987876567', '26999999963'))
// console.log(getFilterConversaUserContatoByUserAndContatoNumber('11987876567', '26999999963', 'yet'))