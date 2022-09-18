const url = require('url');

//function to respond with a json object
//takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

const createResponseJSON = (message, id) => {
    if (id === 'ok') {
        return {
            message,
        };
    } else {
        return {
            message,
            id,
        };
    }
};

const success = (request, response) => {
    let statusCode = 200;
    let message = "This is a successful response";
    let id = "ok";

    respondJSON(request, response, statusCode, createResponseJSON(message, id));
};
const badRequest = (request, response) => {
    let statusCode = 200;
    let message = "Missing valid query parameter set to true.";
    let id = "ok";

    const parsedUrl = url.parse(request.url);

    //console.log(parsedUrl.query);

    if (parsedUrl.query === 'valid=true') {
        statusCode = 200;
        message = 'This request has the required parameter.';

    } else {
        statusCode = 400;
        id = 'BadRequest';
    }

    respondJSON(request, response, statusCode, createResponseJSON(message, id));

};
const unauthorized = (request, response) => {
    let statusCode = 200;
    let message = "Missing loggedIn query parameter set to yes.";
    let id = "ok";

    const parsedUrl = url.parse(request.url);

    //console.log(parsedUrl.query);

    if (parsedUrl.query === 'loggedIn=yes') {
        statusCode = 200;
        message = 'You have successfully viewed the content.';
    } else {
        statusCode = 401;
        id = 'Unauthorized';
    }

    respondJSON(request, response, statusCode, createResponseJSON(message, id));

};
const forbidden = (request, response) => {
    let statusCode = 403;
    let message = "You do not have access to this content.";
    let id = "Forbidden";

    respondJSON(request, response, statusCode, createResponseJSON(message, id));

};
const internal = (request, response) => {
    let statusCode = 500;
    let message = "Internal Server Error. Something went wrong.";
    let id = "InternalServerError";

    respondJSON(request, response, statusCode, createResponseJSON(message, id));

};
const notImplemented = (request, response) => {
    let statusCode = 501;
    let message = "A get request for this page has not been implemented yet. Check again later for updated Content.";
    let id = "NotImplemented";

    respondJSON(request, response, statusCode, createResponseJSON(message, id));

};
const notFound = (request, response) => {
    let statusCode = 404;
    let message = "The page you are looking for was not found.";
    let id = "NotFound";

    respondJSON(request, response, statusCode, createResponseJSON(message, id));
};

//public exports
module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
};