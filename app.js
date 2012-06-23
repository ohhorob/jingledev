// My SocketStream app

var http = require('http')
  , ss = require('socketstream');

// Define a single-page client
ss.client.define('main', {
  view: 'app.html',
  css:  ['libs', 'app.styl'],
  code: ['libs', 'app'],
  tmpl: '*'
});

ss.client.define('todos', {
  view: 'todos.html',
  css:  ['libs', 'todos.css'],
  code: ['libs', 'todos'],
  tmpl: 'todo/'
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
  res.serveClient('main');
})

ss.http.router.on('/todos', function(req, res){
	res.serveClient('todos');
})

// Code Formatters
ss.client.formatters.add(require('ss-stylus'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));
ss.client.templateEngine.use('ember', '/todo');

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env == 'production') ss.client.packAssets();

// Start web server
var server = http.Server(ss.http.middleware);
server.listen(3000);

// Start SocketStream
ss.start(server);