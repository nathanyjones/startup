import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './posts.css';

export function ViewPosts() {
    return (
            <main className="container-fluid bg-secondary bg-custom">
                <h1 className="display-4 text-white py-4 mt-4">Explore Ideas</h1>
                <section className="mt-3" id="posts-section">
                    <div className="row">
                        <PostTemplate
                            title={localStorage.getItem('title')}
                            author={localStorage.getItem('userName')}
                            content={localStorage.getItem('postContent')}
                            datePosted={localStorage.getItem('date')}
                            numLikes={localStorage.getItem('numLikes') || 0}
                        />
                        
                        <PostTemplate
                            title={"Mindfulness in the Workplace"}
                            author={"CalmOffice23"}
                            content={"Picture an app designed to help employees take short, guided breaks throughout the workday. " +
                                "This could lead to improved mental health and increased productivity, all while promoting a balanced work-life approach."}
                            datePosted={"2024-10-04"}
                            numLikes={15}
                        />
                        
                        <PostTemplate
                            title={"Virtual Travel Experiences"}
                            author={"GlobeTrotter88"}
                            content={"What if there was a VR platform that allows you to explore different countries from the comfort of your home. " +
                                "Users could experience guided tours, interact with locals, and even learn the language of the place they are exploring!"}
                            datePosted={"2024-10-01"}
                            numLikes={1}
                        />

                        <PostTemplate
                            title={"AI-Powered Personal Assistants for Seniors"}
                            author={"TechCare56"}
                            content={"Imagine an AI personal assistant that helps seniors with everyday tasks like medication reminders, grocery shopping, " +
                                "and staying connected with loved ones. This assistant could offer voice commands and even monitor health metrics to ensure safety and well-being."}
                            datePosted={"2024-11-12"}
                            numLikes={20}
                        />

                        <PostTemplate
                            title={"Self-Sustaining Urban Farms"}
                            author={"GreenCity99"}
                            content={"What if cities could have self-sustaining urban farms that provide fresh produce directly to residents? " +
                                "These vertical farms could use hydroponics and solar energy to grow vegetables year-round, reducing the need for transportation and contributing to food security."}
                            datePosted={"2024-11-14"}
                            numLikes={35}
                        />

                        <PostTemplate
                            title={"Eco-Friendly Packaging Solutions"}
                            author={"EcoWarrior77"}
                            content={"Imagine packaging made entirely from biodegradable materials that break down in landfills. " +
                                "This would reduce plastic waste significantly and help create a more sustainable future for our planet. " +
                                "Consumers could easily recycle and dispose of these eco-friendly packages."}
                            datePosted={"2024-11-16"}
                            numLikes={12}
                        />

                        <PostTemplate
                            title={"Blockchain for Transparent Supply Chains"}
                            author={"ChainMaster21"}
                            content={"What if we could use blockchain technology to create fully transparent supply chains?" +
                                "                                    Consumers could track the journey of products from farm to store, ensuring ethical" +
                                "                                    sourcing and reducing fraud. This could change the way we think about sustainability" +
                                "                                    and consumer trust."}
                            datePosted={"2024-11-17"}
                            numLikes={18}
                        />
                        
                    </div>
                </section>
            </main>
    );
}

function PostTemplate( {title, author, content, datePosted, numLikes, replies=[], liked=false} ) {
    const [likePressed, setLikePressed] = React.useState(liked);
    const [localNumLikes, setLocalNumLikes] = React.useState(numLikes);
    
    const navigate = useNavigate()
    
    const pressLike = () => {
        if (likePressed) {
            setLocalNumLikes(localNumLikes - 1);
        } else {
            setLocalNumLikes(localNumLikes + 1);
        }
        setLikePressed(!likePressed)
    }
    
    return (
        <div className="col-md-4 mb-4">
            <div className="post container rounded bg-dark p-4 shadow">
                <h3>{title}</h3>
                <p><b>Posted by:</b> <span>{author}</span></p>
                {/*<p><b>Tags:</b> Technology, Blockchain, Supply Chain</p>*/}
                <p>{content}</p>
                <p><em>Posted on: {datePosted}</em></p>
                <div className="post_buttons mt-3">
                    {author === localStorage.getItem('userName') &&
                        <button className="like btn btn-light me-2 mt-2">{localNumLikes} Likes</button>}
                    {author !== localStorage.getItem('userName') &&
                        <>
                        <button className="like btn btn-light me-2 mt-2" onClick={pressLike} >{likePressed ? 'Remove Like' : 'Like'} ({localNumLikes})</button>
                        {/*<button className="reply btn btn-light me-2 mt-2">Reply</button>*/}
                        </>
                    }
                    {/*<button className="view_replies btn btn-light me-2 mt-2">View Replies</button>*/}
                    { author !== localStorage.getItem('userName') && 
                        <button className="dm btn btn-light me-2 mt-2" onClick={() => {navigate('/send-message', {state: {recipient: author} }); localStorage.setItem('recipient', author)} }>Message</button> }
                </div>
            </div>
        </div>
    );
}

export default ViewPosts;
