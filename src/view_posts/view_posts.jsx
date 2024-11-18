import React from 'react';
import './posts.css';

export function ViewPosts() {
    return (
            <main className="container-fluid bg-secondary bg-custom">
                <h1 className="display-4 text-white py-4 mt-4">Explore Ideas</h1>
                <section className="mt-3" id="posts-section">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="post container rounded bg-dark p-4 shadow">
                                <h3>Virtual Travel Experiences</h3>
                                <p><b>Posted by:</b> <span className="username">GlobeTrotter88</span></p>
                                <p><b>Tags:</b> Travel, Technology, VR</p>
                                <p>What if there was a VR platform that allows you to explore different countries from
                                    the comfort of your home.
                                    Users could experience guided tours, interact with locals, and even learn the
                                    language of the place they are exploring!</p>
                                <p><em>Posted on: 2024-10-01</em></p>
                                <div className="post_buttons mt-3">
                                    <button className="dm btn btn-light me-2 mt-2">Direct Message</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="post container rounded bg-dark p-4 shadow">
                                <h3>Mindfulness in the Workplace</h3>
                                <p><b>Posted by:</b> <span className="username">CalmOffice23</span></p>
                                <p><b>Tags:</b> Work, Mindfulness, Productivity</p>
                                <p>Picture an app designed to help employees take short, guided breaks throughout the
                                    workday.
                                    This could lead to improved mental health and increased productivity, all while
                                    promoting a balanced work-life approach.</p>
                                <p><em>Posted on: 2024-10-04</em></p>
                                <div className="post_buttons mt-3">
                                    <button className="like btn btn-light me-2 mt-2">Like (15)</button>
                                    <button className="reply btn btn-light me-2 mt-2">Reply</button>
                                    <button className="view_replies btn btn-light me-2 mt-2">View Replies</button>
                                    <button className="dm btn btn-light me-2 mt-2">Direct Message</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="post container rounded bg-dark p-4 shadow">
                                <h3>AI-Powered Personal Assistants for Seniors</h3>
                                <p><b>Posted by:</b> <span className="username">TechCare56</span></p>
                                <p><b>Tags:</b> Technology, Seniors, AI</p>
                                <p>Imagine an AI personal assistant that helps seniors with everyday tasks like
                                    medication reminders, grocery shopping, and staying connected with loved ones. This
                                    assistant could offer voice commands and even monitor health metrics to ensure
                                    safety and well-being.</p>
                                <p><em>Posted on: 2024-11-12</em></p>
                                <div className="post_buttons mt-3">
                                    <button className="like btn btn-light me-2 mt-2">Like (20)</button>
                                    <button className="reply btn btn-light me-2 mt-2">Reply</button>
                                    <button className="view_replies btn btn-light me-2 mt-2">View Replies</button>
                                    <button className="dm btn btn-light me-2 mt-2">Direct Message</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="post container rounded bg-dark p-4 shadow">
                                <h3>Self-Sustaining Urban Farms</h3>
                                <p><b>Posted by:</b> <span className="username">GreenCity99</span></p>
                                <p><b>Tags:</b> Sustainability, Urban, Farming</p>
                                <p>What if cities could have self-sustaining urban farms that provide fresh produce
                                    directly to residents? These vertical farms could use hydroponics and solar energy
                                    to grow vegetables year-round, reducing the need for transportation and contributing
                                    to food security.</p>
                                <p><em>Posted on: 2024-11-14</em></p>
                                <div className="post_buttons mt-3">
                                    <button className="like btn btn-light me-2 mt-2">Like (35)</button>
                                    <button className="reply btn btn-light me-2 mt-2">Reply</button>
                                    <button className="view_replies btn btn-light me-2 mt-2">View Replies</button>
                                    <button className="dm btn btn-light me-2 mt-2">Direct Message</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="post container rounded bg-dark p-4 shadow">
                                <h3>Eco-Friendly Packaging Solutions</h3>
                                <p><b>Posted by:</b> <span className="username">EcoWarrior77</span></p>
                                <p><b>Tags:</b> Environment, Packaging, Sustainability</p>
                                <p>Imagine packaging made entirely from biodegradable materials that break down in
                                    landfills. This would reduce plastic waste significantly and help create a more
                                    sustainable future for our planet. Consumers could easily recycle and dispose of
                                    these eco-friendly packages.</p>
                                <p><em>Posted on: 2024-11-16</em></p>
                                <div className="post_buttons mt-3">
                                    <button className="like btn btn-light me-2 mt-2">Like (12)</button>
                                    <button className="reply btn btn-light me-2 mt-2">Reply</button>
                                    <button className="view_replies btn btn-light me-2 mt-2">View Replies</button>
                                    <button className="dm btn btn-light me-2 mt-2">Direct Message</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="post container rounded bg-dark p-4 shadow">
                                <h3>Blockchain for Transparent Supply Chains</h3>
                                <p><b>Posted by:</b> <span className="username">ChainMaster21</span></p>
                                <p><b>Tags:</b> Technology, Blockchain, Supply Chain</p>
                                <p>What if we could use blockchain technology to create fully transparent supply chains?
                                    Consumers could track the journey of products from farm to store, ensuring ethical
                                    sourcing and reducing fraud. This could change the way we think about sustainability
                                    and consumer trust.</p>
                                <p><em>Posted on: 2024-11-17</em></p>
                                <div className="post_buttons mt-3">
                                    <button className="like btn btn-light me-2 mt-2">Like (18)</button>
                                    <button className="reply btn btn-light me-2 mt-2">Reply</button>
                                    <button className="view_replies btn btn-light me-2 mt-2">View Replies</button>
                                    <button className="dm btn btn-light me-2 mt-2">Direct Message</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
            </main>
    );
}

export default ViewPosts;
