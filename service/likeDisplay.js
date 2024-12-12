const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js');

async function likeDisplay(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    let connections = [];
    let posts = await DB.getPosts();

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);

        ws.send(JSON.stringify({ type: 'initialPosts', data: posts }));

        ws.on('message', async (data) => {
            const message = JSON.parse(data);

            if (message.type === 'likePost') {
                const postId = message.postId;
                const newNumLikes = message.numLikes;

                await DB.likePost(postId, newNumLikes);

                const postToUpdate = posts.find(post => post.id === postId);
                postToUpdate.numLikes = newNumLikes;

                const updateMessage = { type: 'likePost', data: { postId, newNumLikes } };
                connections.forEach((c) => c.ws.send(JSON.stringify(updateMessage)));
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

module.exports = {likeDisplay};