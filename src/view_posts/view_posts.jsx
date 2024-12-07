import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './posts.css';

export function ViewPosts() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/posts')
            .then((response) => response.json())
            .then((posts) => {
                setPosts(posts);
            });
    }, []);
    
    return (
            <main className="container-fluid bg-secondary bg-custom">
                <h1 className="display-4 text-white py-4 mt-4">Explore Ideas</h1>
                <section className="mt-3" id="posts-section">
                    <div className="row">
                        {posts.slice().reverse().map((post, index) => (
                            <PostTemplate
                                postID={post.id}
                                title={post.title}
                                author={post.author}
                                content={post.content}
                                datePosted = {post.datePosted}
                                numLikes = {post.numLikes}
                            />
                        ))}
                    </div>
                </section>
            </main>
    );
}
function PostTemplate( {postID, title, author, content, datePosted, numLikes, liked=false} ) {
    const [likePressed, setLikePressed] = React.useState(liked);
    const [localNumLikes, setLocalNumLikes] = React.useState(numLikes);
    
    const navigate = useNavigate()
    
    const pressLike = (postID) => {
        const updatedLikes = likePressed ? localNumLikes - 1 : localNumLikes + 1;
        setLocalNumLikes(updatedLikes);
        setLikePressed(!likePressed)
        fetch(`/api/like-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postID: postID,
                numLikes: updatedLikes,
            }),
        })
            .then(() => console.log("Post like count successfully updated to " + updatedLikes + "."))
            .catch(() => console.log("Error: Post like count failed to update."));
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
