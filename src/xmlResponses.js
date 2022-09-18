const url = require('url');

// function to respond with a json object
// takes request, response, status code and object to send
const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

const createResponseXML = (message, id) => {
  if (id === 'ok') {
    return `<response><message>${message}</message></response>`;
  }
  return `<response><message>${message}</message><id>${id}</id></response>`;
};

const success = (request, response) => {
  const statusCode = 200;
  const message = 'This is a successful response';
  const id = 'ok';

  respondXML(request, response, statusCode, createResponseXML(message, id));
};
const badRequest = (request, response) => {
  let statusCode = 200;
  let message = 'Missing valid query parameter set to true.';
  let id = 'ok';

  const parsedUrl = url.parse(request.url);

  // console.log(parsedUrl.query);

  if (parsedUrl.query === 'valid=true') {
    statusCode = 200;
    message = 'This request has the required parameter.';
  } else {
    statusCode = 400;
    id = 'BadRequest';
  }

  respondXML(request, response, statusCode, createResponseXML(message, id));
};
const unauthorized = (request, response) => {
  let statusCode = 200;
  let message = 'Missing loggedIn query parameter set to yes.';
  let id = 'ok';

  const parsedUrl = url.parse(request.url);

  // console.log(parsedUrl.query);

  if (parsedUrl.query === 'loggedIn=yes') {
    statusCode = 200;
    message = 'You have successfully viewed the content.';
  } else {
    statusCode = 401;
    id = 'Unauthorized';
  }

  respondXML(request, response, statusCode, createResponseXML(message, id));
};
const forbidden = (request, response) => {
  const statusCode = 403;
  const message = 'You do not have access to this content.';
  const id = 'Forbidden';

  respondXML(request, response, statusCode, createResponseXML(message, id));
};
const internal = (request, response) => {
  const statusCode = 500;
  const message = 'Internal Server Error. Something went wrong.';
  const id = 'InternalServerError';

  respondXML(request, response, statusCode, createResponseXML(message, id));
};
const notImplemented = (request, response) => {
  const statusCode = 501;
  const message = 'A get request for this page has not been implemented yet. Check again later for updated Content.';
  const id = 'NotImplemented';

  respondXML(request, response, statusCode, createResponseXML(message, id));
};
const notFound = (request, response) => {
  const statusCode = 404;
  const message = 'The page you are looking for was not found.';
  const id = 'NotFound';

  respondXML(request, response, statusCode, createResponseXML(message, id));
};
// public exports
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
