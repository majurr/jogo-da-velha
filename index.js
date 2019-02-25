const restify = require('restify');
const errs = require('restify-errors');

var knex = require('knex')({
  client: 'pg',
  version: '11.1',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'game'
  }
})

const server = restify.createServer({
    name: 'jogo-da-velha',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/all", function (req, res, next) {
    knex('history').then(dados => {
        res.send(dados);
    }, next);
})

server.post('/send', function (req, res, next) {
    knex('history')
    .insert(req.body)
    .then(dados => {
        return res.send(dados);
    }, next);    
});

// definindo um ponto de entrada do sistema a partir de um arquivo estático (index.html)
server.get('/*.*', restify.plugins.serveStatic({
    directory: './dist',
    default: 'index.html'
}));

const port = process.env.PORT || 3100;
server.listen(port, function () {
    console.log(`servidor escutando porta ${port}`);
});
