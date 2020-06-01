/**
 * Created by pradip on 7/5/17.
 * Updated by Rohit Mishra on 28/1/18
 */
const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var env_config = process.env.NODE_ENV || 'development';

app.prepare()
    .then(() => {
        const server = express()
        
        server.get('*', (req, res) => {
            return handle(req, res)
        })
        var port_number = process.env.PORT || 4000;
        server.listen(port_number, (err) => {
            if (err) throw err
            console.log('> Ready on environment '+env_config+' http://localhost:' +port_number);
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })