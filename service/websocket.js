const { WebSocketServer } = require('ws');
const WebSocket = require('ws');

function setupWebSocket(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
        console.log('WebSocket client connected');

        ws.on('message', (message) => {
            try {
                const parsedMessage = JSON.parse(message);

                switch(parsedMessage.type) {
                    case 'likePost':
                        wss.clients.forEach((client) => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify({
                                    type: 'likeUpdate',
                                    postId: parsedMessage.postId,
                                    numLikes: parsedMessage.numLikes
                                }));
                            }
                        });
                        break;
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        });

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    });

    return wss;
}

module.exports = { setupWebSocket };