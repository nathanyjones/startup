import React from 'react';
import './main.css';
import './create_post.css';
import { Link } from 'react-router-dom';

export function CreatePost() {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Make a Post</title>

            <link rel="stylesheet" href="../index.css" />
            <link rel="stylesheet" href="./create_post.css" />
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossOrigin="anonymous"
            />
        </head>

        <body className="bg-dark">
        <header className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Idea Share</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/create-post">Create Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/posts">View Posts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/inbox">Inbox</Link>
                            </li>
                        </ul>
                        <span className="navbar-text text-light me-3">
                                    Logged in as: 'Username'
                                </span>
                    </div>
                </div>
            </nav>
        </header>

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

        <footer className="bg-dark text-white-50">
            <div className="container-fluid">
                <span className="text-reset">Nathan Jones</span>
                <a className="text-reset" href="https://github.com/nathanyjones/startup.git">GitHub</a>
            </div>
        </footer>
        </body>
        </html>
    );
}

export default CreatePost;
