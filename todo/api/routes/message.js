import express from "express";
import expressWs from "express-ws";
import { wsUsers } from "../context/ws-users.js";

let router = express.Router();
expressWs(router);

router.ws('/:wid', (ws, req) => {
    ws.send("Build websocket success!");

    // save websocket connection.
    if (!wsUsers[req.params.wid]) {
        wsUsers[req.params.wid] = [];
    }
    wsUsers[req.params.wid].push(ws);

    // listen to the message from clients
    ws.onmessage = (msg) => {
        console.log(`receive message from user ${req.params.wid}: ${msg}.`);
    }

    // close
    ws.onclose = () => {
        wsUsers[req.params.wid] = wsUsers[req.params.wid].filter((client) => {
            return client !== ws;
        });
    }
    if (wsUsers[req.params.wid].length === 0) {
        delete wsUsers[req.params.wid];
    }
});

export default router;