import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './posts.css';

export function ViewPosts() {
    const [posts, setPosts] = React.useState([]);
    
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

    React.useEffect(() => {
        fetch('/api/posts')
            .then((response) => response.json())
            .then((posts) => {
                setPosts(posts);
            })
            .catch((error) => console.error("Couldn't fetch posts from server.", error));
    }, []);
    
    return (
            <main className="container-fluid bg-secondary bg-custom">
                <h1 className="display-4 text-white py-4 mt-4">Explore Ideas</h1>
                <section className="mt-3" id="posts-section">
                    <div className="row">
                        {posts.slice().reverse().map((post, index) => (
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
function PostTemplate( {postID, title, author, content, datePosted, numLikes, socket, liked=false} ) {
    const [likePressed, setLikePressed] = React.useState(liked);
    const [localNumLikes, setLocalNumLikes] = React.useState(numLikes);
    
    const navigate = useNavigate()
    
    const pressLike = (postID) => {
        const updatedLikes = likePressed ? localNumLikes - 1 : localNumLikes + 1;
        setLocalNumLikes(updatedLikes);
        setLikePressed(!likePressed)
        socket.send(JSON.stringify({
            type: 'likePost',
            postId: postID,
            numLikes: updatedLikes
        }));
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
