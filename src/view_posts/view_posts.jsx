import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import './posts.css';

export function ViewPosts() {
    return (
        <div className="bg-dark text-light">
            
            <main className="container-fluid bg-secondary">
                <h1 className="display-4 text-white py-4">Explore Ideas</h1>
                <section className="mt-3" id="posts-section">
                    <div className="row">
                        {/* Sample Post */}
                        <div className="col-md-4 mb-4">
                            <div className="post container rounded bg-dark p-4 shadow">
                                <h3>Virtual Travel Experiences</h3>
                                <p><b>Posted by:</b> <span className="username">GlobeTrotter88</span></p>
                                <p><b>Tags:</b> Travel, Technology, VR</p>
                                <p>What if there was a VR platform that allows you to explore different countries from the comfort of your home.
                                    Users could experience guided tours, interact with locals, and even learn the language of the place they are exploring!</p>
                                <p><em>Posted on: 2024-10-01</em></p>
                                <div className="post_buttons mt-3">
                                    <button className="dm btn btn-light me-2 mt-2">Direct Message</button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Posts... */}

                        <div className="col-md-4 mb-4">
                            <div className="post container rounded bg-dark p-4 shadow">
                                <h3>Mindfulness in the Workplace</h3>
                                <p><b>Posted by:</b> <span className="username">CalmOffice23</span></p>
                                <p><b>Tags:</b> Work, Mindfulness, Productivity</p>
                                <p>Picture an app designed to help employees take short, guided breaks throughout the workday.
                                    This could lead to improved mental health and increased productivity, all while promoting a balanced work-life approach.</p>
                                <p><em>Posted on: 2024-10-04</em></p>
                                <div className="post_buttons mt-3">
                                    <button className="like btn btn-light me-2 mt-2">Like (15)</button>
                                    <button className="reply btn btn-light me-2 mt-2">Reply</button>
                                    <button className="view_replies btn btn-light me-2 mt-2">View Replies</button>
                                    <button className="dm btn btn-light me-2 mt-2">Direct Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
        </div>
    );
}

export default ViewPosts;
