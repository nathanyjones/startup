import React, { useState } from 'react';
import './create_post.css';
import {Link, useNavigate} from 'react-router-dom';

export function CreatePost() {
    const [title, setTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const navigate = useNavigate();
    
    const submitPost = async (e) => {
        e.preventDefault();
        // Send post data to server to be rendered in View Posts
        let date = new Date();
        let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const post = {
            title: title,
            content: postContent,
            datePosted: dateString,
            numLikes: 0,
            author: localStorage.getItem('userName')
        };
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });
        setTitle('')
        setPostContent('')
        navigate('/view-posts')
    }
    
    return (
        <>
            <main className="bg-secondary container-fluid py-5">
                <h1 className="display-4 text-white">Post Your Idea!</h1>
                <form method="post" onSubmit={submitPost} className="bg-dark p-4 rounded shadow text-white">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Post Title:</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            className="form-control" 
                            required 
                            placeholder="Title of Post" 
                            onChange = {(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Post Content:</label>
                        <textarea 
                            id="content" 
                            name="content" 
                            rows="17" 
                            className="form-control" 
                            placeholder="Write your idea here..." 
                            required 
                            onChange = {(e) => setPostContent(e.target.value)} />
                    </div>
                    <div className="buttonHolder">
                        <button type="submit" className="btn btn-secondary">Submit your Post!</button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default CreatePost;
