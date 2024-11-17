import React from 'react';
import './create_post.css';
import { Link } from 'react-router-dom';

export function CreatePost() {
    return (
        <>
            <main className="bg-secondary container-fluid py-5">
                <h1 className="display-4 text-white">Post Your Idea!</h1>
                <form method="post" action="/posts" className="bg-dark p-4 rounded shadow text-white">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Post Title:</label>
                        <input type="text" id="title" name="title" className="form-control" required placeholder="Title of Post" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Post Content:</label>
                        <textarea id="content" name="content" rows="12" className="form-control" placeholder="Write your idea here..." required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags:</label>
                        <input type="text" id="tags" name="tags" className="form-control" required placeholder="Relevant Tags" />
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
