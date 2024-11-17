import React from 'react';
import './inbox.css';
import { Link } from 'react-router-dom';

export function Inbox() {
    return (
        <>
            <main className="container-fluid bg-secondary">
                <h1 className="display-4 text-white py-4">Your Messages</h1>

                <div id="messages" className="mb-4">
                    <div className="message container bg-dark rounded text-white p-3 mb-3">
                        <p className="mb-1"><strong>MangoEater2000</strong></p>
                        <p className="mb-1"><i>2024-09-26</i></p>
                        <p className="mb-2"><i>Subject: Dragon Story</i></p>
                        <p>I saw your post about the dragon story, and I thought it was a really good idea! I would like to use it as the plot of a children's book I am writing if that's okay with you?</p>
                        <button className="btn btn-light btn-sm">Reply</button>
                    </div>

                    <div className="message container bg-dark rounded text-white p-3 mb-3">
                        <p className="mb-2"><strong>RedRockinRoller</strong></p>
                        <p className="mb-2"><i>2024-09-25</i></p>
                        <p className="mb-2"><i>Subject: Cooking App Idea</i></p>
                        <p>Hey, I really liked your idea for your cooking website. I have some web programming skills, so would you want to collaborate with me, and we can build it together?</p>
                        <button className="btn btn-light btn-sm">Reply</button>
                    </div>

                    <div className="message container bg-dark rounded text-white p-3 mb-3">
                        <p className="mb"><em>New messages will appear here</em></p>
                    </div>
                </div>

                <Link id="send_message_button" to="/send-message" className="btn btn-dark mb-3">Send a Message</Link>
            </main>
        </>
    );
}

export default Inbox;
