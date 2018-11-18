const fs = require('fs');

const requestHandler = ((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Form server</title></head>');
        res.write('<body>');
        res.write('<form action="/message" method="post">');        // msg=abc
        res.write('<input type="text" name="msg" />')
        res.write('<button type="submit">Submit</button>');
        res.write('</form>')
        res.write('</body>');
        res.write('</html>');
        return res.end();           // so that the logic does not go to the next statement
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })

        // *return* ensures that subsequent blocks of logic do not run prior to our callback
        return req.on('end', () => {
            // parse
            const parsedBody = Buffer.concat(body).toString();
            const msg = parsedBody.split('=')[1];
            //fs.writeFileSync("../files/file1.txt", msg);

            fs.writeFile('../files/file1.txt', msg, err => {
                if (err !== null) {
                    console.log('error', err);
                }
                 // redirect
                res.statusCode = '302';
                res.setHeader('Location', '/');
                return res.end();
            });
       });
    }

    // on submit, logic comes to this block
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node HTTP module</title></head>');
    res.write('<body><h2>Response object</h2></body>');
    res.write('</html>');
    res.end();
});

//module.exports = handleRequest;
module.exports = {
    handler: requestHandler,
    notes:  "Some notes"
}




