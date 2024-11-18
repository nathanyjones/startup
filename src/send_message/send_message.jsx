import React, { useState } from 'react';
import './send_message.css';

export function SendMessage() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    
    const Submit = (e) => {
        e.preventDefault();
        // Placeholder for actually sending the message (via server).
        console.log("Message Sent:", { recipient, subject, message });
        setMessageSent(true);
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
                    <label htmlFor="subject" className="form-label">Message</label>
                    <textarea
                        id="subject"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form