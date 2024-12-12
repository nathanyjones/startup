const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('ideashare');
const userCollection = db.collection('user');
const postCollection = db.collection('post');
const messageCollection = db.collection('message');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);
    return user;
}

async function addPost(post) {
    post.id = uuid.v4();
    await postCollection.insertOne(post);
}

async function getPosts() {
    const posts = await postCollection.find().toArray();
    return posts;
}

async function getPostById(id) {
    const post = await postCollection.find({id: id});
    return post;
}

async function likePost(id, numLikes) {
    await postCollection.updateOne(
        {id: id},
        {$set: {numLikes: numLikes}}
    );
}

async function getUserMessages(username) {
    const messages = await messageCollection.find({
        $or: [
            {recipient: username},
            {sender: username},
        ]
    }).toArray();
    if (messages.length === 0) {
        let date = new Date();
        const defaultMessage = {
            id: uuid.v4(),
            recipient: username,
            sender: "Admin",
            subject: "Welcome!",
            messageContent: "Thank you for joining IdeaShare. If you have any questions or concerns, please don't hesitate to contact us at ideashare12345@gmail.com",
            dateSent: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            timestamp: Date.now(),
            replies: []
        };
        await messageCollection.insertOne(defaultMessage);
        return [defaultMessage];
    }
    return messages;
}

async function sendMessage(message) {
    const recipient = await userCollection.findOne({ username: message.recipient });
    if (!recipient) {
        throw new Error('User not found');
    }
    message.id = uuid.v4();
    await messageCollection.insertOne(message);
}

async function sendReply(messageID, replyContent, replySender, replyRecipient) {
    const originalMessage = await messageCollection.findOne({id: messageID, recipient: replyRecipient});
    if (!originalMessage) {
        throw new Error('Original message not found');
    }
    const reply = {
        replyID: uuid.v4(),
        sender: replySender,
        recipient: replyRecipient,
        content: replyContent
    };
    await messageCollection.updateOne(
        {id: messageID, recipient: replyRecipient},
        {$push: {replies: reply}}
    );
}


module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addPost,
    getPosts,
    likePost,
    sendMessage,
    getUserMessages,
    sendReply,
    getPostById,
};