//Dependencia que faz consulta http
const express = require('express');
//Transforma toda requisicao e resposta em json
const bodyParser = require('body-parser');
//Dependencia para permitir acesso ao servidor de qualquer fonte
const cors = require('cors');
//Arquivo que contem os caminhos para os controllers
const routes = require('./routes');

//Cria um objeto express para usar funções de consultas
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Sempre em ultimo
app.use(routes);

//Define qual porta ele vai responder quando vc acessar localhost
app.listen(8000);
