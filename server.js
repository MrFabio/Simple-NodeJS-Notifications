var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	parser = new require('xml2json'),
	fs = require('fs');

// creating the server ( localhost:8000 ) 
app.listen(18282);

// on server started we can load our Consumer_1.html page
function handler(req, res) {
	//replace dir 
	fs.readFile('Consumer_1.html', function (err, data) {
		if (err) {
			console.log(err);
			res.writeHead(500);
			return res.end('Error loading Consumer_1.html');
		}
		res.writeHead(200);
		res.end(data);
	});
}

var sock = [];

var id_count=1;

// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function (socket) {
console.log('Connection Opened');
socket.emit('start',{id:id_count});
id_count=id_count+1;
	sock.push(socket);
	// watching the xml file
	fs.watch('example.xml', function (curr, prev) {
		// on file change we can read the new xml
		fs.readFile('example.xml', function (err, data) {
			console.log('Data changed');
			if (err) throw err;
			// parsing the new xml data and converting them into json file
			var json = parser.toJson(data);
			// adding the time of the last update

			json.time = new Date();
			// send the new data to the client


			sock.forEach(function (channel) {
				channel.volatile.emit('notification', json);
				console.log('sending to socket from xml');
			});
		});
	});



	socket.on('data', function (data) {
		console.log('Data Received');
		data.time = new Date();

		data = JSON.stringify(data);

		sock.forEach(function (channel) {
			channel.volatile.emit('notification', data);
			console.log('sending to socket from html');
		});

	});
});