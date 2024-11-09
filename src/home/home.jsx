import React, { useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

export function Home() {
    const [username, setUsername] = useState("Username");
    return (
        <div className="home">
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
                                    <Link className="nav-link active" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-post">Create Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/posts">View Posts</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/inbox">Inbox</Link>
                                </li>
                            </ul>
                            <span className="navbar-text text-light me-3">Logged in as: {username}"</span>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="bg-secondary py-5">
                <section id="welcome" className="container text-center mb-2">
                    <h2 className="display-4">Welcome to Idea Share</h2>
                    <i>Everything begins with an idea.</i>
                    <br /><br />
                    <img src="./Gemini_Generated_Image_rbhyv7rbhyv7rbhy.jpeg" className="img-fluid rounded" style={{ maxWidth: '80%' }} width="350" alt="AI generated image of lightbulb surrounded by artistic, creative, random objects." />
                </section>
                <section id="user-auth" className="container">
                    <h3 className="mt-4">Login or Create Account</h3>
                    <form id="login" method="get" action="/posts" className="bg-secondary">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="your@email.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" name="password" className="form-control" placeholder="password" required />
                        </div>
                        <div className="d-flex justify-content-md-center">
                            <button type="submit" className="btn btn-dark me-3">Login</button>
                            <button type="submit" className="btn btn-dark">Create</button>
                        </div>
                    </form>
                </section>
            </main>

            <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                    <span className="text-reset">Nathan Jones</span>
                    <a className="text-reset" href="https://github.com/nathanyjones/startup.git">Source</a>
                </div>
            </footer>
        </div>
    );
}

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
    return (
        <main className='container-fluid bg-secondary text-center'>
            <div>
                {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>}
                {authState === AuthState.Authenticated && (
                    <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                        }}
                    />
                )}
            </div>
        </main>
    );
}
