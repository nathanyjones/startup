import React from 'react';
import './inbox.css';
import {Link} from 'react-router-dom';

export function Inbox() {
    React.useEffect(() => {
        fetch('/api/messages')
            .then((response) => response.json())
            .then((posts) => {
                setPosts(posts);
            });
    }, []);

    return (
        <main className="container-fluid bg-secondary">
            <h1 className="display-4 text-white py-4">Your Messages</h1>

            <Message
                fromUsername={'MangoEater2000'}
                date={'2024-09-26'}
                subject={'Dragon Story'}
                incomingMessageContent={"I saw your post about the dragon story, and I thought it was a really good idea! I would like to use it as the plot of a children's book I am writing if that's okay with you?"}
                currentReplies={[]}
            />

            <Message
                fromUsername={'RedRockinRoller'}
                date={'2024-09-25'}
                subject={'Cooking App Idea'}
                incomingMessageContent={"Hey, I really liked your idea for your cooking website. I have some web programming skills, so would you want to collaborate with me, and we can build it together?"}
                currentReplies={["Yeah that sounds great! When do you want to start working on that?"]}
            />

    <div className="message container bg-dark rounded text-white p-3 mb-3">
        <p className="mb"><em>New messages will appear here</em></p>
    </div>
            
            <Link id="send_message_button" to="/send-message" className="btn btn-dark mb-3">Send a Message</Link>
        </main>
    );
}

function Message({fromUsername, date, subject, incomingMessageContent, currentReplies}) {
    const [replyClicked, setReplyClicked] = React.useState(false);
    const [replyContent, setReplyContent] = React.useState('');
    const [replies, setReplies] = React.useState(currentReplies);
    
    const sendReply = (e) => {
        e.preventDefault();
        console.log("Reply Sent");
        setTimeout(() => {
            setReplyClicked(false);
            setReplies(replies.concat([replyContent]));
            setReplyContent('');
        }, 200);
    }

    return (
        <div className="container bg-dark rounded text-white p-3 mb-3">
            <p className="mb-2"><strong>{fromUsername}</strong></p>
            <p className="mb-2"><i>{date}</i></p>
            <p className="mb-2"><i>Subject: {subject}</i></p>
            <p>{incomingMessageContent}</p>

            {replies.map((reply, index) => (
                <p key={index}>{reply}</p>
            ))}
            
            {!replyClicked &&
                <button className="btn btn-light btn-sm" onClick={(e) => setReplyClicked(true)}>Reply</button>}
            {replyClicked &&
                <>
                    <form id="reply_form" onSubmit={sendReply} className="p-3">
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
                            type="submit" className="btn btn-light btn-sm">Send
                        </button>
                    </form>
                </>
            }
        </div>
    )
}


export default Inbox;
