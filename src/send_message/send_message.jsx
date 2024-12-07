import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './send_message.css';

export function SendMessage() {
    const location = useLocation();
    const [recipient, setRecipient] = useState(location.state?.recipient || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    
    const Submit = (e) => {
        e.preventDefault();
        let date = new Date()
        let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const message_obj = {
            recipient: recipient,
            sender: localStorage.getItem('userName'),
            subject: subject,
            messageContent: message,
            dateSent: dateString,
            timestamp: Date.now(),
            replies: []
        }
        // Placeholder for actually sending the message
        console.log("Message Sent:", { recipient, subject, message });
        setMessageSent(true);
        localStorage.removeItem('recipient');
    };
    
    const createNewForm = () => {
        setRecipient('');
        setSubject('');
        setMessage('');
        setMessageSent(false);
    }

    if (messageSent) {
        return <MessageSentScreen createNewForm={createNewForm} />;
    } else {
        return (
            <NewMessageForm
                recipient={recipient}
                subject={subject}
                message={message}
                setRecipient={setRecipient}
                setSubject={setSubject}
                setMessage={setMessage}
                onSubmit={Submit}
            />
        );
    }
}

function NewMessageForm({recipient, subject, message, setRecipient, setSubject, setMessage, onSubmit}) {
    return (
        <main className="bg-secondary bg-custom">
            <h1 className="display-4 text-white py-2">Send a Message</h1>
            <form id="message_form" onSubmit={onSubmit} className="bg-dark p-4 rounded shadow text-white">
                <div className="mb-3">
                    <label htmlFor="recipient" className="form-label">Recipient</label>
                    <input
                        type="text"
                        id="recipient"
                        name="recipient"
                        className="form-control"
                        required
                        placeholder="Recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <textarea
                        id="subject"
                        name="subject"
                        rows="1"
                        className="form-control"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="10"
                        className="form-control"
                        placeholder="Write your message here..."
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className="buttonHolder">
                    <button type="submit" className="btn btn-secondary">Send Message</button>
                </div>
            </form>
        </main>
    );
}

function MessageSentScreen({createNewForm}) {
    return (
        <main className="bg-secondary bg-custom">
            <h1 className="display-2 text-white">Message Sent!</h1>
            <button id='SendAnotherMessageButton' onClick={createNewForm} className="btn btn-dark p-4">Send Another?</button>
        </main>
    );
}