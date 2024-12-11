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

let users = {};
let messages = {};
let posts = [];



// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
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

// GetPosts
apiRouter.get('/posts', (_req, res) => {
    res.send(posts);
});

// SubmitPost
apiRouter.post('/create-post', (req, res) => {
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

// SendMessage
apiRouter.post('/message', (req, res) => {
    const message = req.body.message;
    const recipient = message.recipient;
    if (!Object.keys(users).includes(recipient)) {
        console.log("invalid user");
        res.status(404).send({ msg: 'User not found' });
        return
    }
    console.log(message);
    message['id'] = uuid.v4();
    console.log(recipient);
    messages[recipient].push(message);
    console.log(messages[recipient]);
    res.status(204).send();
});

// ReplyToMessage
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
    const username = req.query.username;
    let date = new Date();
    if (!messages[username]) {
        messages[username] = [];
        const defaultMessage = {
            id: uuid.v4(),
            recipient: username,
            sender: "Admin",
            subject: "Welcome!",
            messageContent: "Thank you for joining IdeaShare. If you have any questions or concerns, please don't hesitate to contact us at ideashare12345@gmail.com",
            dateSent: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            timestamp: Date.now(),
            replies: []
        }
        messages[username].push(defaultMessage);
    }
    res.send(messages[username]);
});
