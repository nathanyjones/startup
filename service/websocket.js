const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function setupWebSocket(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    let connections = [];

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);
        console.log('WebSocket client connected');

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                if (data.type === 'likePost') {
                    connections.forEach((c) => {
                        // Intentionally sending message back to self for testing
                        c.ws.send(message)
                        // if (c.id !== connection.id) {
                        //     c.ws.send(message);
                        // }
                    });
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        });

        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);
            if (pos >= 0) {
                connections.splice(pos, 1);
            }
        });

        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    setInterval(() => {
        connections.forEach((c) => {
            if (!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);
}

module.exports = { setupWebSocket };