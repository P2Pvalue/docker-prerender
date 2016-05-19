var prerender = require('prerender');

var server = prerender({
	workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
	iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
	phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
	messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT
    });


server.use(prerender.removeScriptTags());

if (process.env.BASIC_AUTH_USERNAME) {
    server.use(prerender.basicAuth());
}

server.use(prerender.inMemoryHtmlCache());

// Log errors to console
server.use(prerender.logger());

//server.use(prerender.blacklist());
//server.use(prerender.httpHeaders());
// server.use(prerender.s3HtmlCache());
// server.use(require('my-plugin'));

server.start();
