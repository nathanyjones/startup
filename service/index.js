const express = require('express');
const app = express();
const uuid = require('uuid');

app.use(express.json());

let users = {};
let posts = [];
let messages = {};

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.username];
    if (user) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = { username: req.body.username, password: req.body.password, token: uuid.v4() };
        users[user.username] = user;
        
        res.send({ token: user.token });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.username];
    if (user) {
        if (req.body.password === user.password) {
            user.token = uuid.v4();
            res.send({ token: user.token });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
        delete user.token;
    }
    res.status(204).send();
});

// GetPosts
apiRouter.get('/posts', (_req, res) => {
    res.send(posts);
});

// SubmitPost
apiRouter.post('/make-post', (req, res) => {
    const post = req.body;
    post['id'] = uuid.v4();
    posts.push(req.body);
    res.status(204).send();
});

// LikePost
apiRouter.post('/like-post', (req, res) => {
    const post = posts.find(post => post.id === req.body.postID);
    post.numLikes = req.body.numLikes;
    res.status(204).send();
});

apiRouter.post('/message', (req, res) => {
    const message = req.body.message;
    message['id'] = uuid.v4();
    const user = message.recipient;
    if (!messages[user]) {
        messages[user] = [message];
    } else {
        messages[user].push(message);
    }
    res.status(204).send();
});

apiRouter.post('/messages/reply', (req, res) => {
    const { messageID, replyContent, replySender, replyRecipient } = req.body;
    const userMessages = messages[replyRecipient];
    const originalMessage = userMessages.find((message) => message.id === messageID);
    const reply = {
        replyID: uuid.v4(),
        sender: replySender,
        recipient: replyRecipient,
        content: replyContent
    };
    originalMessage.replies.push(reply);
})

// GetMessages
apiRouter.get('/messages', (req, res) => {
    if (!req.query.username) {
        return res.status(400).send({msg: 'Invalid request: No username given'});
    }
    const userMessages = messages[req.query.username];
    if (!userMessages) {
        return res.status(409).send({ msg: 'No Messages to Display' });
    }
    res.send(userMessages);
});
