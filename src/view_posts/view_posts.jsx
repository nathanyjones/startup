import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './posts.css';

export function ViewPosts() {
    const [posts, setPosts] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        fetch('/api/posts')
            .then((response) => response.json())
            .then((posts) => {
                setPosts(posts);
            })
            .catch((error) => console.error("Couldn't fetch posts from server.", error));
        
        try {
            const protocol = window.location.protocol === 'https:' ? 'ws' : 'wss';
            let port = window.location.port;
            const newSocket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

            newSocket.onopen = () => {
                console.log('WebSocket connection established.');
            };

            newSocket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'likeUpdate') {
                        console.log('Received like update:', data);
                        setPosts(prevPosts =>
                            prevPosts.map(post =>
                                post.id === data.postId ? {...post, numLikes: data.numLikes} : post
                            )
                        );
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            newSocket.onerror = (error) => {
                console.error('WebSocket connection error:', error);
            };
            newSocket.onclose = (event) => {
                console.error('WebSocket connection closed:', event);
            };
            setSocket(newSocket);
            return () => {
                newSocket.close();
            };
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
        }
    }, []);

    return (
        <main className="container-fluid bg-secondary bg-custom">
            <h1 className="display-4 text-white py-4 mt-4">Explore Ideas</h1>
            <section className="mt-3" id="posts-section">
                <div className="row">
                    {posts.slice().reverse().map((post) => (
                        <PostTemplate
                            key={post.id}
                            postID={post.id}
                            title={post.title}
                            author={post.author}
                            content={post.content}
                            datePosted={post.datePosted}
                            numLikes={post.numLikes}
                            socket={socket}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

function PostTemplate({ postID, title, author, content, datePosted, numLikes, socket }) {
    const [likePressed, setLikePressed] = useState(false);
    const [localNumLikes, setLocalNumLikes] = useState(numLikes);

    useEffect(() => {
        setLocalNumLikes(numLikes);
    }, [numLikes]);

    const pressLike = async (postID) => {
        const updatedLikes = likePressed ? localNumLikes - 1 : localNumLikes + 1;
        try {
            const response = await fetch('/api/like-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postID: postID,
                    numLikes: updatedLikes,
                }),
            });

            if (response.ok) {
                setLocalNumLikes(updatedLikes);
                setLikePressed(!likePressed);

                if (socket && socket.readyState === WebSocket.OPEN) {
                    console.log('Sending WebSocket like update', {
                        type: 'likePost',
                        postId: postID,
                        numLikes: updatedLikes
                    });
                    socket.send(JSON.stringify({
                        type: 'likePost',
                        postId: postID,
                        numLikes: updatedLikes
                    }));
                }
            }
        } catch (error) {
            console.error("Failed to update likes", error);
        }
    }

    return (
        <div className="col-md-4 mb-4">
            <div className="post container rounded bg-dark p-4 shadow">
                <h3>{title}</h3>
                <p><b>Posted by:</b> <span>{author}</span></p>
                <p>{content}</p>
                <p><em>Posted on: {datePosted}</em></p>
                <div className="post_buttons mt-3">
                    {author === localStorage.getItem('userName') &&
                        <button className="like btn btn-light me-2 mt-2">{localNumLikes} Likes</button>}
                    {author !== localStorage.getItem('userName') &&
                        <>
                            <button className="like btn btn-light me-2 mt-2" onClick={() => pressLike(postID)} >{likePressed ? 'Remove Like' : 'Like'} ({localNumLikes})</button>
                            <button className="dm btn btn-light me-2 mt-2" onClick={() => {navigate('/send-message', {state: {recipient: author} }); localStorage.setItem('recipient', author)} }>Message</button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default ViewPosts;
