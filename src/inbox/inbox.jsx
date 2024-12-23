import React from 'react';
import './inbox.css';
import {useNavigate} from "react-router-dom";


export function Inbox() {
    const [messages, setMessages] = React.useState([]);
    const navigate = useNavigate();
    
    React.useEffect(() => {
        fetch(`/api/messages?username=${localStorage.getItem('userName')}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then((response) => response.json())
            .then((messages) => {
                setMessages(messages);
            })
            .catch((error) => console.error("Failed to retrieve messages", error));
    }, []);
    
    

    return (
        
        <main className="container-fluid bg-secondary">
            <h1 className="display-4 text-white py-4">Your Messages</h1>
            
            {messages.slice().reverse().map((message, index) => (
                <Message
                    key={message.id}
                    fromUsername={message.sender}
                    date={message.dateSent}
                    subject={message.subject}
                    incomingMessageContent={message.messageContent}
                    currentReplies={message.replies}
                    messageID={message.id}
                />
            ))}
            
            <button id="send_message_button" onClick={() => navigate('/send-message')} className="btn btn-dark mb-3">Send a Message</button>
        </main>
    );
}

function Message({fromUsername, date, subject, incomingMessageContent, currentReplies, messageID}) {
    const [replyClicked, setReplyClicked] = React.useState(false);
    const [replyContent, setReplyContent] = React.useState('');
    const [replies, setReplies] = React.useState(currentReplies);

    const sendReply = () => {
        console.log("Reply Sent");
        const reply = {
            messageID: messageID,
            replyContent: replyContent,
            replySender: localStorage.getItem('userName'),
            replyRecipient: fromUsername
        }
        fetch('/api/messages/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reply),
        })
            .then(() => {
                setReplyClicked(false);
                setReplies(replies.push(replyContent));
                setReplyContent('');
            })
            .catch((error) => console.error("Reply could not be sent.", error));
    }

    return (
        <div className="container bg-dark rounded text-white p-3 mb-3">
            <p className="mb-2"><strong>{fromUsername}</strong></p>
            <p className="mb-2"><i>{date}</i></p>
            <p className="mb-2"><i>Subject: {subject}</i></p>
            <p>{incomingMessageContent}</p>

            {replies.map((reply, index) => (
                <p key={index}><i>{reply.sender}</i>: {reply.content}</p>
            ))}
            
            {!replyClicked &&
                <button className="btn btn-light btn-sm" onClick={(e) => setReplyClicked(true)}>Reply</button>}
            {replyClicked &&
                <>
                    <form id="reply_form" className="p-3">
                        <div className="">
                            <label htmlFor="reply" className="form-label">Reply</label>
                            <textarea
                                id="reply"
                                name="reply"
                                rows="3"
                                className="form-control"
                                placeholder="Write your reply here..."
                                required
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                        </div>
                        <button
                            className="btn btn-light btn-sm m-4" onClick={(e) => setReplyClicked(false)}>Cancel
                        </button>
                        <button 
                            className="btn btn-light btn-sm" onClick={sendReply} disabled={!replyContent || !localStorage.getItem('userName')}>Send
                        </button>
                    </form>
                </>
            }
        </div>
    )
}


export default Inbox;
