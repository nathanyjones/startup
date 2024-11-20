import React, { useState } from 'react';
import './home.css';

export function Home( {userName, loggedIn, onLoginChange} ) {
    const [localUserName, setLocalUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const login = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', localUserName);
        onLoginChange(localUserName, true);
    }
    
    return (
        <main className="bg-secondary py-5">
            <section id="welcome" className="container text-center mb-2">
                <h1 className="display-4">Welcome to Idea Share</h1>
                <i>Everything begins with an idea.</i>
                <br /><br />
                <img src="/Gemini_Generated_Image_rbhyv7rbhyv7rbhy.jpeg" className="img-fluid rounded" style={{ maxWidth: '80%' }} width="350" alt="AI generated image of lightbulb surrounded by artistic, creative, random objects." />
            </section>
            { !loggedIn && 
                <section id="user-auth" className="container">
                <h3 className="mt-4">Login or Create Account</h3>
                <form id="login" method="get" onSubmit={ login } action="/view-posts" className="bg-secondary">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" id="username" name="username" className="form-control" placeholder="username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" placeholder="password" required />
                    </div>
                    <div className="d-flex justify-content-md-center">
                        <button type="submit" className="btn btn-dark me-3">Login</button>
                        {/*<button type="submit" className="btn btn-dark">Create</button>*/}
                    </div>
                </form>
            </section> }
        </main>
    );
}