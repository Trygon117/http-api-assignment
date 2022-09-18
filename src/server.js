const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    'JSON': {
        '/success': jsonHandler.success,
        '/badRequest': jsonHandler.badRequest,
        '/unauthorized': jsonHandler.unauthorized,
        '/forbidden': jsonHandler.forbidden,
        '/internal': jsonHandler.internal,
        '/notImplemented': jsonHandler.notImplemented,
        '/notFound': jsonHandler.notFound,
    },
    'XML': {
        '/success': xmlHandler.success,
        '/badRequest': xmlHandler.badRequest,
        '/unauthorized': xmlHandler.unauthorized,
        '/forbidden': xmlHandler.forbidden,
        '/internal': xmlHandler.internal,
        '/notImplemented': xmlHandler.notImplemented,
        '/notFound': xmlHandler.notFound,
    },
    notFound: jsonHandler.notFound,
};


//function to handle requests
const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    console.log(parsedUrl.pathname);
    //console.log(request.headers.accept);

    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response);
    } else if (urlStruct['JSON'][parsedUrl.pathname]) {
        if (request.headers.accept === 'text/xml') {
            console.log('XML type requested');
            urlStruct['XML'][parsedUrl.pathname](request, response);
        } else {
            console.log('Returning JSON');
            urlStruct['JSON'][parsedUrl.pathname](request, response);
        }
    } else {
        urlStruct.notFound(request, response);
    }
};

//start server
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});