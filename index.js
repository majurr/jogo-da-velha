const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
    name: 'jogo-da-velha',
    version: '1.0.0'
});


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

// definindo um ponto de entrada do sistema a partir de um arquivo estático (index.html)
server.get('/*.*', restify.plugins.serveStatic({
    directory: './dist',
    default: 'index.html'
}));
