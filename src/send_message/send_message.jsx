import React, { useState } from 'react';
import './send_message.css';

export function SendMessage() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const Submit = (e) => {
        e.preventDefault();
        console.log("Message Sent:", { recipient, subject, message });
    };

    return (
        <>
            <main className="bg-secondary">
                <h1 className="display-4 text-white py-2">Send a Message</h1>
                <form id="message_form" onSubmit={Submit} className="bg-dark p-4 rounded shadow text-white">
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
        </>
    );
}
