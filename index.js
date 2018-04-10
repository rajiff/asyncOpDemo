const http = require('http');
const fs = require('fs');

function log(msg) {
	console.log(`[${new Date()}] ${msg} `);
}

const syncHandler = function(req, res) {
	log(`Got a new Request `);
  // Read file synchronously
  try {
    let data = fs.readFileSync('./deliveries.csv', 'utf8');

    // Send content back
    res.writeHead(200);
    res.end(JSON.stringify({ data }));

    log(`~ DONE ~`);
  } catch (err) {
  	log(`Caught ERROR::${err}`);

    res.writeHead(400);
    res.end(JSON.stringify({ error: err }));

    log(`~ DONE ~`);
  }
  log(`~ EXITING ~`);
}

const asyncHandler = function(req, res) {
	log(`[${new Date()}] Got a new Request `);

  // Read the file async way using callbacks
  fs.readFile('./deliveries.csv', 'utf8', (err, data) => {
    if (err) {
    	log(`Callback received ERROR::${err}`);

      res.writeHead(400);
      res.end(JSON.stringify({ error: err }));

      log(`~ DONE ~`);
    } else {
    	// Return the data
    	res.writeHead(200);
    	res.end(JSON.stringify({ data }));

    	log(`~ DONE ~`);
    }
  });
  log(`~ EXITING ~`);
  return;
}

let server = http.createServer(syncHandler);
// let server = http.createServer(asyncHandler);
server.listen(3000);