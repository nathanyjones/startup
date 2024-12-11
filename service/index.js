const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const uuid = require('uuid');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// let users = {};
// let messages = {};
// let posts = [];



// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.username, req.body.password);
        DB.setAuthCookie(res, user.token);
        res.send({
            id: user._id,
        });
    }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

// GetPosts
secureApiRouter.get('/posts', async (_req, res) => {
    const posts = await DB.getPosts();
    res.send(posts);
});

// SubmitPost
secureApiRouter.post('/create-post', async (req, res) => {
    const post = req.body;
    post['id'] = uuid.v4();
    await DB.addPost();
    res.status(204).send();
});

// LikePost
apiRouter.post('/like-post', async (req, res) => {
    await DB.likePost(req.body.postID, req.body.numLikes);
    res.status(204).send();
});

// SendMessage
apiRouter.post('/message', async (req, res) => {
    const message = req.body.message;
    try {
        await DB.sendMessage(message);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        if (error.message === 'User not found') {
            res.status(404).send({msg: 'User not found'});
        } else {
            res.status(500).send({msg: 'Internal server error'});
        }
    }
});

// ReplyToMessage
apiRouter.post('/messages/reply', async (req, res) => {
    const { messageID, replyContent, replySender, replyRecipient } = req.body;
    try {
        await DB.sendReply(messageID, replyContent, replySender, replyRecipient);
    } catch (error) {
        console.error(error);
        if (error.message === 'Original message not found') {
            res.status(404).send({msg: 'Message not found'})
        } else {
            res.status(500).send({msg: 'Internal server error'});
        }
    }
});

// GetMessages
apiRouter.get('/messages', async (req, res) => {
    const username = req.query.username;
    
    res.send(messages[username]);
    
    const userMessages = await DB.getUserMessages(username)
    res.send(userMessages)
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});










// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    console.log("in the thing")
    const user = users[req.body.username]
    console.log('user = ', user);
    if (user) {
        console.log('existing user')
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = { username: req.body.username, password: req.body.password, token: uuid.v4() };
        users[user.username] = user;
        console.log("user.token")
        res.status(200).send({ token: user.token });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.username];
    if (user) {
        if (req.body.password === user.password) {
            user.token = uuid.v4();
            res.status(200).send({ token: user.token });
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