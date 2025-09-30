/***********************************************************************************************************************************
 * Objetivo: API responsavel em cirar end points referentes api do whatssap
 * Data: 30/09/2025
 * Autor: Sidney
 * Versão 1.0
 * 
 * Observações: Instalar dependencia para criar a API 
 *      express     -> npm install express      --save Instala as dependênciais para criar uma API
 *      cors        -> npm install cors         --save Instala as dependênciais para configurar as permissões uma API
 *      body-parser -> npm install body-parser  --save Instala as dependênciais para receber os tipos de daados via POST ou PUT
 *********************************************************************************************************************************/

// Import das dependências
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

// Import do arquivo de funções
const dados         = require('./modulo/funcoes.js')

// Define a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta
            // em execução local podemos definir uma porta livre
const PORT          = process.PORT || 8080

// Instância na class do express
const app = express()

// Configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin','*')      // IP de origem
    response.header('Access-Control-Allow-Methods','GET')   // Metodos (Verbos) do protocolo HTTP

    app.use(cors())
    next()                                                  //Próximo, ler tudo
})

//Request   -> Recebe os dados da API
//Response  -> Envia os dados na API

// EndPoint 
        // Listar todos os dados de usuário independente do número
app.get('/v1/whatsapp/contatos', function(request, response){
    let contatos = dados.getAllContatos()
    response.status(contatos.statuscode)
    response.json(contatos)
})
        // Listar dados da conta do profile do usuário
app.get('/v1/whatsapp/contato/dadosProfile/:numberProfile', function(request, response){
    let numberProfile           = request.params.numberProfile 
    let contatos = dados.getContatosByNumber(numberProfile)
    response.json(contatos)

})
        // Listar dados de contato para cada usuário
app.get('/v1/whatsapp/contato/dadosUser/:numberProfile', function(request, response){
    let numberProfile           = request.params.numberProfile 
    let contatos = dados.getDadosPessoaisConversasByNumber(numberProfile)
    response.json(contatos)

})
        // Listar todas as mensagens trocadas de uma conta de usuário
app.get('/v1/whatsapp/contato/dadosMenssage/:numberProfile', function(request, response){
    let numberProfile             = request.params.numberProfile
    let contatos = dados.getMenssagesTrocadasByNumber(numberProfile)
    response.json(contatos)
})
        // Listar uma conversa de um usuário e um contato
app.get('/v1/whatsapp/contato/conversa/', function(request, response){
    let userNumber = request.query.userNumber
    let contatoNumber = request.query.contatoNumber
    let contatos = dados.getConversaUserContatoByUserAndContatoNumber(userNumber, contatoNumber)
    response.json(contatos)
})
        //Envia um filtro como “pesquisa de palavra chave” com base em uma palavra nas conversas do usuário e do respectivo contato
app.get('/v1/whatsapp/contato/palavraChave/', function(request, response){
    let userNumber = request.query.userNumber
    let contatoNumber = request.query.contatoNumber
    let palavraChave = request.query.palavraChave
    let contatos = dados.getFilterConversaUserContatoByUserAndContatoNumber(userNumber, contatoNumber, palavraChave)
    response.json(contatos)
})
//Start da API
app.listen(PORT, function(){
    console.log('API aguardando requisições ....')
})