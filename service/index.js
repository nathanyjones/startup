const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const uuid = require('uuid');
const { likeDisplay } = require('./likeDisplay.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.set('trust proxy', true);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ msg: 'Username already in use' });
    } else {
        const user = await DB.createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
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
            res.send({id: user._id});
        } else {
            res.status(401).send({msg: 'Unauthorized: Incorrect Password'});
        }
    } else {
        res.status(404).send({msg: 'User not found'});
    }
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
    await DB.addPost(post);
    res.status(200).send({msg: 'Post successfully added'});
});

// LikePost
secureApiRouter.post('/like-post', async (req, res) => {
    await DB.likePost(req.body.postID, req.body.numLikes);
    res.status(204).send();
});

// SendMessage
secureApiRouter.post('/message', async (req, res) => {
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
secureApiRouter.post('/messages/reply', async (req, res) => {
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
secureApiRouter.get('/messages', async (req, res) => {
    const username = req.query.username;
    try {
        const userMessages = await DB.getUserMessages(username);
        res.send(userMessages);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: 'Internal server error'})
    }
});

// SetAuthorizationCookie
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

likeDisplay(httpService);
